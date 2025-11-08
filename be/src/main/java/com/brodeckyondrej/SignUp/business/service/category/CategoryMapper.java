package com.brodeckyondrej.SignUp.business.service.category;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryCreateDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.category.CategoryUpdateDto;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryMapper implements EntityMapper<Category, CategoryCreateDto, CategoryUpdateDto, CategoryGetDetailDto, CategoryGetListDto> {

    private final SubjectRepository subjectRepository;

    @Override
    public Category fromCreateDto(CategoryCreateDto categoryCreateDto) {
        Subject foundSubject = subjectRepository.findByIdOrThrow(categoryCreateDto.getSubjectId());
        return new Category(foundSubject, categoryCreateDto.getName());
    }

    @Override
    public void updateFromDto(Category entity, CategoryUpdateDto categoryUpdateDto) {
        Subject foundSubject = subjectRepository.findByIdOrThrow(categoryUpdateDto.getSubjectId());
        entity.setName(categoryUpdateDto.getName());
        entity.setSubject(foundSubject);
    }

    @Override
    public CategoryGetDetailDto toDetailDto(Category entity) {
        return new CategoryGetDetailDto(
                entity.getId(),
                entity.getName(),
                new NamedDtoWithId(entity.getSubject().getId(), entity.getSubject().getName()));
    }

    @Override
    public CategoryGetListDto toListDto(Category entity) {
        //FIXME: je blby takhle tahat vsechny znaky a pak brat size. Spis nejaky sql count
        return new CategoryGetListDto(
                entity.getId(),
                entity.getName(),
                entity.getSigns().size(),
                new NamedDtoWithId(entity.getSubject().getId(), entity.getSubject().getName()));
    }
}
