package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.auth.JwtResponseDto;
import com.brodeckyondrej.SignUp.business.dto.auth.LoginDto;
import com.brodeckyondrej.SignUp.business.dto.password.PasswordRequestDto;
import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.business.specification.UserSpecification;
import com.brodeckyondrej.SignUp.config.EmailSourceConfig;
import com.brodeckyondrej.SignUp.config.WebAddresConfig;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import com.brodeckyondrej.SignUp.persistence.entity.*;
import com.brodeckyondrej.SignUp.persistence.repository.*;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.security.JWTService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class UserService extends NamedEntityService<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private final InviteRepository inviteRepository;
    private final PasswordRequestRepository passwordRequestRepository;
    private final JavaMailSender mailSender;
    private final EmailSourceConfig emailSourceConfig;
    private final WebAddresConfig webAddresConfig;

    public UserService(UserRepository repository, UserValidator validator, UserMapper mapper,
                       ClassroomRepository classroomRepository, SubjectRepository subjectRepository,
                       AuthenticationManager authManager, JWTService jwtService, InviteRepository inviteRepository,
                       PasswordRequestRepository passwordRequestRepository, JavaMailSender mailSender,
                       EmailSourceConfig emailSourceConfig, WebAddresConfig webConfig) {
        super(repository, validator, mapper);
        this.userRepository = repository;
        this.userMapper = mapper;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.inviteRepository = inviteRepository;
        this.passwordRequestRepository = passwordRequestRepository;
        this.mailSender = mailSender;
        this.emailSourceConfig = emailSourceConfig;
        this.webAddresConfig = webConfig;
    }

    public void addStudentToClassroom(StudentClassroomDto dto){
        Classroom classroom = classroomRepository.findByIdOrThrow(dto.getClassroomId());
        User student = userRepository.findByIdOrThrow(dto.getStudentId());
        if(!student.getRole().equals(UserRole.STUDENT)){
            throw new IllegalStateException("User is not a student");
        }

        student.setClassroom(classroom);
    }

    public void removeStudentFromClassroom(StudentClassroomDto dto){
        classroomRepository.findByIdOrThrow(dto.getClassroomId());
        User student = userRepository.findByIdOrThrow(dto.getStudentId());

        student.setClassroom(null);
    }

    public Page<StudentInSubjectDto> findStudentsByNameWithSubject(String studentName, UUID subjectId, Pageable pageable) {
        Subject subject = subjectRepository.findByIdOrThrow(subjectId);

        Specification<User> specification = new SpecificationBuilder<User>()
                .addSpec(UserSpecification.hasRole(UserRole.STUDENT))
                .addSpecIfNotNull(UserSpecification.hasNameLike(studentName), studentName)
                .build();

        return userRepository.findAll(specification, pageable).map(user -> userMapper.toStudentInSubjectDto(user, subject));

    }

    public Page<UserGetListDto> search(UserSearchDto dto, Pageable pageable) {
        SpecificationBuilder<User> specBuilder = new SpecificationBuilder<>();
        specBuilder
                .addSpecIfNotNull(UserSpecification.hasEmailLike(dto.getEmail()), dto.getEmail())
                .addSpecIfNotNull(UserSpecification.hasRole(dto.getRole()), dto.getRole())
                .addSpecIfNotNull(UserSpecification.hasNameLike(dto.getName()), dto.getName());

        if(dto.getSubjectId() != null) {
            Subject subject = subjectRepository.findByIdOrThrow(dto.getSubjectId());
            specBuilder.addSpec(UserSpecification.isInSubject(subject));
        }

        if(dto.getClassroomId() != null) {
            Classroom classroom = classroomRepository.findByIdOrThrow(dto.getClassroomId());
            specBuilder.addSpec(UserSpecification.isInClassroom(classroom));
        }

        return userRepository.findAll(specBuilder.build(), pageable).map(userMapper::toListDto);
    }

    @Override
    public void delete(UUID id){
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            return;
        }
        User userToDelete = user.get();

        Optional<Invite> invite = inviteRepository.findByCreatedUser(userToDelete);
        if(invite.isPresent()){
            inviteRepository.delete(invite.get());
        }

        //This is owned side of many to many relationship. it is necessary to delete relationships
        userToDelete.getSubjects()
                .forEach(subject -> subject.removeStudent(user.get()));
        super.delete(id);
    }

    public JwtResponseDto verifyLogin(LoginDto loginDto) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getName(), loginDto.getPassword()));

        if(!auth.isAuthenticated()){
            throw new BadCredentialsException("Špatný email nebo heslo");
        }

        Optional<User> user = userRepository.findByName(loginDto.getName());
        if(user.isEmpty()){
            throw new MissingObjectException("Uživatel nenalezen");
        }

        return new JwtResponseDto(jwtService.createJWT(user.get()));
    }

    public Void changePassword(UUID userId, ChangePasswordDto changePasswordDto) {
        User user = userRepository.findByIdOrThrow(userId);

        String encodedNew = encoder.encode(changePasswordDto.getNewPassword());
        user.setPassword(encodedNew);
        return null;
    }

    public Void requestPasswordReset(PasswordRequestDto dto) {
        Optional<User> optUser = this.userRepository.findByEmail(dto.getEmail());
        if(optUser.isEmpty()){
            throw new MissingObjectException("Email nenalezen");
        }
        User user = optUser.get();

        PasswordResetRequest passwordResetRequest = new PasswordResetRequest(user, Instant.now(), false);
        passwordRequestRepository.save(passwordResetRequest);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailSourceConfig.emailSource());
        message.setTo(user.getEmail());
        message.setText("""
                Dobrý den,
                byla vyžádaná obnova hesla pro Váš účet. Svoje heslo si můžete obnovit na:
                """ + webAddresConfig.webAddress() + "/password/restore/" + passwordResetRequest.getId() + ".\n Odkaz zůstane platný 15 minut.");
        message.setSubject("obnova hesla");

        mailSender.send(message);

        return null;
    }

    public Void restorePassword(UUID reqId, String password) {
        PasswordResetRequest req = passwordRequestRepository.findByIdOrThrow(reqId);
        Instant expiresAt = req.getCreatedAt().plus(15, TimeUnit.MINUTES.toChronoUnit());
        if(expiresAt.isBefore(Instant.now())) {
            throw new ValidationException("Password reset late");
        }

        if(Boolean.TRUE.equals(req.getUsed())) {
            throw new ValidationException("Password reset link already used");
        }

        User user = req.getUser();
        user.setPassword(encoder.encode(password));
        userRepository.save(user);

        req.setUsed(true);
        passwordRequestRepository.save(req);

        return null;
    }
}
