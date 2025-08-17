package com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface Validator<CreateDto, UpdateDto> {
    void validateCreateOrThrow(CreateDto createDto);
    void validateUpdateOrThrow(UUID originalId, UpdateDto updateDto);
}
