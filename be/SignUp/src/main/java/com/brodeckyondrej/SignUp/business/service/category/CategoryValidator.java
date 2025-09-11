package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.business.dto.category.CreateCategoryDto;
import com.brodeckyondrej.SignUp.business.dto.category.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryValidator implements Validator<CreateCategoryDto, UpdateCategoryDto> {
    @Override
    public void validateCreateOrThrow(CreateCategoryDto createCategoryDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateCategoryDto updateCategoryDto) {

    }
}
