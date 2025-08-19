package com.brodeckyondrej.SignUp.DbEntity.Category;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Service.CategoryService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController extends NamedEntityController<Category, CreateCategoryDto, UpdateCategoryDto, CategoryGetDetailDto, CategoryGetListDto, FindByNameDto> {

    private final CategoryService categoryService;

    public CategoryController(CategoryService service){
        super(service);
        this.categoryService = service;
    }

    @GetMapping("/by-subject/{subjectId}")
    public ResponseEntity<Page<CategoryGetListDto>> findBySubject(@PathVariable UUID subjectId, Pageable pageable){
        Page<CategoryGetListDto> result = categoryService.findBySubject(subjectId, pageable);
        return ResponseEntity.ok(result);
    }
}
