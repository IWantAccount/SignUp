package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.auth.JwtResponseDto;
import com.brodeckyondrej.SignUp.business.dto.auth.LoginDto;
import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.business.specification.UserSpecification;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.security.JWTService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserService extends NamedEntityService<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final AuthenticationManager authManager;
    private final JWTService jwtService;

    public UserService(UserRepository repository, UserValidator validator, UserMapper mapper,
                       ClassroomRepository classroomRepository, SubjectRepository subjectRepository,
                       AuthenticationManager authManager, JWTService jwtService) {
        super(repository, validator, mapper);
        this.userRepository = repository;
        this.userMapper = mapper;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.authManager = authManager;
        this.jwtService = jwtService;

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

        //This is owned side of many to many relationship. it is necessary to delete relationships
        user.get().getSubjects()
                .forEach(subject -> subject.removeStudent(user.get()));
        super.delete(id);
    }

    public JwtResponseDto verifyLogin(LoginDto loginDto) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        if(!auth.isAuthenticated()){
            throw new BadCredentialsException("Špatný email nebo heslo");
        }

        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        if(user.isEmpty()){
            throw new MissingObjectException("Uživatel nenalezen");
        }

        return new JwtResponseDto(jwtService.createJWT(user.get()));
    }
}
