package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.category.*;
import com.brodeckyondrej.SignUp.business.service.category.CategoryService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController extends NamedEntityController<Category, CategoryCreateDto, CategoryUpdateDto, CategoryGetDetailDto, CategoryGetListDto, FindByNameDto> {

    private final CategoryService categoryService;

    public CategoryController(CategoryService service){
        super(service);
        this.categoryService = service;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<CategoryGetListDto>> search(@RequestBody @Valid CategorySearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(categoryService.search(dto, pageable));
    }
}
