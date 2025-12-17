package com.brodeckyondrej.SignUp.business.service.universal;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface Validator<CreateDto, UpdateDto> {
    /**
     * Validates dto. Throws exception in case of invalid dto
     * */
    void validateCreateOrThrow(CreateDto createDto);
    /**
     * Validates dto. Throws exception in case of invalid dto
     * */
    void validateUpdateOrThrow(UUID originalId, UpdateDto updateDto);
}
