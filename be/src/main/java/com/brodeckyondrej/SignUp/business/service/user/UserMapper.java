package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserMapper implements EntityMapper<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public User fromCreateDto(UserCreateDto userCreateDto) {
        return new User(userCreateDto.getName(), encoder.encode(userCreateDto.getPassword()), userCreateDto.getEmail(), userCreateDto.getRole());
    }

    @Override
    public void updateFromDto(User entity, UserUpdateDto userUpdateDto) {
        entity.setName(userUpdateDto.getName());
        entity.setEmail(userUpdateDto.getEmail());
        entity.setRole(userUpdateDto.getRole());
    }

    @Override
    public UserGetDetailDto toDetailDto(User entity) {
        return new UserGetDetailDto(entity.getId(), entity.getName(), entity.getEmail(), entity.getClassroom() == null ? "" : entity.getClassroom().getName(), entity.getRole());
    }

    @Override
    public UserGetListDto toListDto(User entity) {
        return new UserGetListDto(entity.getId(), entity.getName(),
                entity.getEmail(),
                entity.getClassroom() == null ? "" : entity.getClassroom().getName(),
                entity.getClassroom() == null ? null : entity.getClassroom().getId());
    }

    public StudentInSubjectDto toStudentInSubjectDto(User student, Subject subject) {
        boolean inSubject = student.getSubjects().contains(subject);
        return new StudentInSubjectDto(student.getName(), student.getId(), inSubject, subject.getId());
    }
}
