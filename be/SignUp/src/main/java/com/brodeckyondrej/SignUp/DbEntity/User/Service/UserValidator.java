package com.brodeckyondrej.SignUp.DbEntity.User.Service;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserUpdateDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserValidator implements Validator<UserCreateDto, UserUpdateDto> {
    @Override
    public void validateCreateOrThrow(UserCreateDto userCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UserUpdateDto userUpdateDto) {

    }
}
