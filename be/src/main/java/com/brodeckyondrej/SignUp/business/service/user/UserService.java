package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.business.specification.UserSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserService extends NamedEntityService<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final UserMapper userMapper;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;

    public UserService(UserRepository repository, UserValidator validator, UserMapper mapper, ClassroomRepository classroomRepository, SubjectRepository subjectRepository) {
        super(repository, validator, mapper);
        this.userRepository = repository;
        this.userValidator = validator;
        this.userMapper = mapper;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
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
}
