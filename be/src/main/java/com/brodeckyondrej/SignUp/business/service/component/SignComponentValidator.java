package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.SignComponentCreateDto;
import com.brodeckyondrej.SignUp.business.dto.component.SignComponentUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SignComponentValidator implements Validator<SignComponentCreateDto, SignComponentUpdateDto> {
    @Override
    public void validateCreateOrThrow(SignComponentCreateDto signComponentCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, SignComponentUpdateDto signComponentUpdateDto) {

    }
}
