package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SignComponentValidator implements Validator<ComponentDto, ComponentDto> {
    @Override
    public void validateCreateOrThrow(ComponentDto componentDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, ComponentDto componentDto) {

    }
}
