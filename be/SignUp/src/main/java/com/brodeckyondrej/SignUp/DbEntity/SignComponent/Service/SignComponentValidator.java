package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Service;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
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
