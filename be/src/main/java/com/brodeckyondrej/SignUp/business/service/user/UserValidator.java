package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.UserCreateDto;
import com.brodeckyondrej.SignUp.business.dto.user.UserUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserValidator extends NamedEntityValidator<User, UserCreateDto, UserUpdateDto> {

}
