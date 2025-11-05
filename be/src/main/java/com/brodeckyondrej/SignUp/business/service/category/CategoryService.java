package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryCreateDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryUpdateDto;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
public class CategoryService extends NamedEntityService<Category, CategoryCreateDto, CategoryUpdateDto, CategoryGetDetailDto, CategoryGetListDto> {
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
