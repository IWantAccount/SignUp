package com.brodeckyondrej.SignUp.DbEntity.User.Service;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.ClassroomRepository;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.*;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRepository;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRole;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService extends NamedEntityService<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final UserMapper userMapper;
    private final ClassroomRepository classroomRepository;

    public UserService(UserRepository repository, UserValidator validator, UserMapper mapper, ClassroomRepository classroomRepository) {
        super(repository, validator, mapper);
        this.userRepository = repository;
        this.userValidator = validator;
        this.userMapper = mapper;
        this.classroomRepository = classroomRepository;
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

}
