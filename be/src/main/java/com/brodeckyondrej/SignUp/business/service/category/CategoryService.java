package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.business.dto.category.*;
import com.brodeckyondrej.SignUp.business.specification.CategorySpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
        SpecificationBuilder<Category> specBuilder = new SpecificationBuilder<>();
        specBuilder.addSpecIfNotNull(CategorySpecification.hasNameLike(dto.getName()), dto.getName());

        if(dto.getSubjectId() != null){
            Subject found = subjectRepository.findByIdOrThrow(dto.getSubjectId());
            specBuilder.addSpec(CategorySpecification.hasSubject(found));
        }

        return categoryRepository.findAll(specBuilder.build(), pageable).map(categoryMapper::toListDto);
    }
}
