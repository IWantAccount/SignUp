package com.brodeckyondrej.SignUp.DbEntity.Category.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.Category.CategoryRepository;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectRepository;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
public class CategoryService extends NamedEntityService<Category, CreateCategoryDto, UpdateCategoryDto, CategoryGetDetailDto, CategoryGetListDto> {
    private final CategoryRepository categoryRepository;
    private final SubjectRepository subjectRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository repository, CategoryValidator validator, CategoryMapper mapper, SubjectRepository subjectRepository) {
        super(repository, validator, mapper);
        this.categoryRepository = repository;
        this.subjectRepository = subjectRepository;
        this.categoryMapper = mapper;
    }

    public Page<CategoryGetListDto> findBySubject(UUID subjectId, Pageable pageable){
        Subject foundSubject = subjectRepository.findByIdOrThrow(subjectId);
        return categoryRepository.findBySubject(foundSubject, pageable).map(categoryMapper::toListDto);
    }
}
