package com.brodeckyondrej.SignUp.business.service.user;

import com.brodeckyondrej.SignUp.business.dto.user.UserCreateDto;
import com.brodeckyondrej.SignUp.business.dto.user.UserUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserValidator extends NamedEntityValidator<User, UserCreateDto, UserUpdateDto> {
    public UserValidator(UserRepository repository) {
        super(repository);
    }
}
