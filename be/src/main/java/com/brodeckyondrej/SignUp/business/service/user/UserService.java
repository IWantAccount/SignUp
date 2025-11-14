package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<UserGetListDto> findBySubjects(UUID subjectId, Pageable pageable) {
        Subject subject = subjectRepository.findByIdOrThrow(subjectId);
        return userRepository.findDistinctBySubjectsContaining(subject, pageable).map(userMapper::toListDto);
    }

    public Page<UserGetListDto> findByClassroom(UUID classroomId, Pageable pageable) {
        Classroom classroom = classroomRepository.findByIdOrThrow(classroomId);
        return userRepository.findByClassroom(classroom, pageable).map(userMapper::toListDto);
    }

    public Page<UserGetListDto> findBySubjectAndName(UUID subjectId, String name, Pageable pageable) {
        Subject subject = subjectRepository.findByIdOrThrow(subjectId);
        Page<User> res;
        if(name.isEmpty()) {
            res = userRepository.findDistinctBySubjectsContaining(subject, pageable);
        }
        else {
            res = userRepository.findDistinctBySubjectsContainingAndNameContainingIgnoreCase(subject, name, pageable);
        }
        return res.map(userMapper::toListDto);
    }

    public Page<UserGetListDto> findByClassroomAndName(UUID classroomId, String name, Pageable pageable) {
        Classroom classroom = classroomRepository.findByIdOrThrow(classroomId);
        return userRepository.findByClassroomAndNameContainingIgnoreCase(classroom, name, pageable)
                .map(userMapper::toListDto);
    }

    public Page<StudentInSubjectDto> findStudentsByNameWithSubject(String studentName, UUID subjectId, Pageable pageable) {
        Subject subject = subjectRepository.findByIdOrThrow(subjectId);
        Page<User> res;
        if(studentName.isEmpty()) {
            res = userRepository.findByRole(UserRole.STUDENT, pageable);
        }
        else {
            res = userRepository.findByNameContainingIgnoreCaseAndRole(studentName, UserRole.STUDENT, pageable);
        }

        return res.map(student -> userMapper.toStudentInSubjectDto(student, subject));

    }

    public Page<UserGetListDto> findByRoleAndName(String name, UserRole role, Pageable pageable) {
        Page<User> res;
        if(name.isEmpty()){
            res = userRepository.findByRole(role, pageable);
        }
        else {
            res = userRepository.findByNameContainingIgnoreCaseAndRole(name, role, pageable);
        }

        return res.map(userMapper::toListDto);
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
