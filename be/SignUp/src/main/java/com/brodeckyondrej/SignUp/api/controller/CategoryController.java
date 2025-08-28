package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.category.CreateCategoryDto;
import com.brodeckyondrej.SignUp.business.dto.category.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.business.service.category.CategoryService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
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
