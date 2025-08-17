package com.brodeckyondrej.SignUp.DbEntity.Category;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Service.CategoryService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController extends NamedEntityController<Category, CreateCategoryDto, UpdateCategoryDto, CategoryGetDetailDto, CategoryGetListDto, FindByNameDto> {

    public CategoryController(CategoryService service){
        super(service);
    }
}
