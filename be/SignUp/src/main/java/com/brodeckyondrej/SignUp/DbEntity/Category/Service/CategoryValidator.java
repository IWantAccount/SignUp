package com.brodeckyondrej.SignUp.DbEntity.Category.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
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
