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
        return null;
    }

    @Override
    public void updateFromDto(User entity, UserUpdateDto userUpdateDto) {

    }

    @Override
    public UserGetDetailDto toDetailDto(User entity) {
        return null;
    }

    @Override
    public UserGetListDto toListDto(User entity) {
        return null;
    }
}
