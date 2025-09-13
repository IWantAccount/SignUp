package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.CreateSignDto;
import com.brodeckyondrej.SignUp.business.dto.sign.UpdateSignDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SignValidator implements Validator<CreateSignDto, UpdateSignDto> {
    @Override
    public void validateCreateOrThrow(CreateSignDto createSignDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateSignDto updateSignDto) {

    }
}
