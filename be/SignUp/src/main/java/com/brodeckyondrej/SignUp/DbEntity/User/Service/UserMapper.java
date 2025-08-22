package com.brodeckyondrej.SignUp.DbEntity.User.Service;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class UserMapper implements EntityMapper<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto> {
    @Override
    public User fromCreateDto(UserCreateDto userCreateDto) {
        return new User(userCreateDto.getName(), userCreateDto.getPassword(), userCreateDto.getEmail(), userCreateDto.getRole());
    }

    @Override
    public void updateFromDto(User entity, UserUpdateDto userUpdateDto) {
        entity.setName(userUpdateDto.getName());
        entity.setPassword(userUpdateDto.getPassword());
        entity.setEmail(userUpdateDto.getEmail());
        entity.setRole(userUpdateDto.getRole());
    }

    @Override
    public UserGetDetailDto toDetailDto(User entity) {
        return new UserGetDetailDto(entity.getId(), entity.getName(), entity.getEmail(), entity.getClassroom() == null ? "" : entity.getClassroom().getName());
    }

    @Override
    public UserGetListDto toListDto(User entity) {
        return new UserGetListDto(entity.getId(), entity.getName(), entity.getEmail(), entity.getClassroom() == null ? "" : entity.getClassroom().getName());
    }
}
