package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryCreateDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryValidator implements Validator<CategoryCreateDto, CategoryUpdateDto> {
    @Override
    public void validateCreateOrThrow(CategoryCreateDto categoryCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, CategoryUpdateDto categoryUpdateDto) {

    }
}
