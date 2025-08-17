package com.brodeckyondrej.SignUp.DbEntity.Category.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.Category.CategoryRepository;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends NamedEntityService<Category, CreateCategoryDto, UpdateCategoryDto, CategoryGetDetailDto, CategoryGetListDto> {
    public CategoryService(CategoryRepository repository, CategoryValidator validator, CategoryMapper mapper) {
        super(repository, validator, mapper);
    }
}
