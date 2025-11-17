package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.business.dto.category.*;
import com.brodeckyondrej.SignUp.business.specification.CategorySpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;
import java.util.List;

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

    public Page<CategoryGetListDto> search(CategorySearchDto dto, Pageable pageable) {
        List<Specification<Category>> spec = new ArrayList<>();
        if(dto.getSubjectId() != null){
            Subject found = subjectRepository.findByIdOrThrow(dto.getSubjectId());
            spec.add(CategorySpecification.hasSubject(found));
        }

        if(dto.getName() != null){
            spec.add(CategorySpecification.hasNameLike(dto.getName()));
        }

        Specification<Category> finalSpecification = Specification.allOf(spec);

        return categoryRepository.findAll(finalSpecification, pageable).map(categoryMapper::toListDto);
    }
}
