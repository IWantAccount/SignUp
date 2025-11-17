package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.SignCreateDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SignValidator implements Validator<SignCreateDto, SignUpdateDto> {
    @Override
    public void validateCreateOrThrow(SignCreateDto signCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, SignUpdateDto signUpdateDto) {

    }
}
