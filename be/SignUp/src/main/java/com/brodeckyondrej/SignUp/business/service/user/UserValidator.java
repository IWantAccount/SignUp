package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.UserCreateDto;
import com.brodeckyondrej.SignUp.business.dto.user.UserUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
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
