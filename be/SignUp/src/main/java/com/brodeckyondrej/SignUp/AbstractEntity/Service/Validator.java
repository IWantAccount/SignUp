package com.brodeckyondrej.SignUp.AbstractEntity.Service;

import org.springframework.stereotype.Component;

@Component
public interface Validator<CreateDto, UpdateDto> {
    void validateCreateOrThrow(CreateDto createDto);
    void validateUpdateOrThrow(UpdateDto updateDto);
}
