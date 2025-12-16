package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryCreateDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryValidator extends NamedEntityValidator<Category, CategoryCreateDto, CategoryUpdateDto> {

}
