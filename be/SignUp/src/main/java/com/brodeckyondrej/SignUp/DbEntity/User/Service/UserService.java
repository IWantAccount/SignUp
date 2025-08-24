package com.brodeckyondrej.SignUp.DbEntity.User.Service;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.ClassroomRepository;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectRepository;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.*;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRepository;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRole;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
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
            throw new IllegalStateException("Student is not a student");
        }

        student.setClassroom(classroom);
    }

    public void removeStudentFromClassroom(StudentClassroomDto dto){
        //throws exception if classroom is not present
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

}
