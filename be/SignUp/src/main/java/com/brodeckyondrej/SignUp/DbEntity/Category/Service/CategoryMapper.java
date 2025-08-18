package com.brodeckyondrej.SignUp.DbEntity.Category.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CreateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.UpdateCategoryDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectRepository;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryMapper implements EntityMapper<Category, CreateCategoryDto, UpdateCategoryDto, CategoryGetDetailDto, CategoryGetListDto> {

    private final SubjectRepository subjectRepository;

    @Override
    public Category fromCreateDto(CreateCategoryDto createCategoryDto) {
        Subject foundSubject = subjectRepository.findByIdOrThrow(createCategoryDto.getSubjectId());
        return new Category(foundSubject, createCategoryDto.getName());
    }

    @Override
    public void updateFromDto(Category entity, UpdateCategoryDto updateCategoryDto) {
        Subject foundSubject = subjectRepository.findByIdOrThrow(updateCategoryDto.getSubjectId());
        entity.setName(updateCategoryDto.getName());
        entity.setSubject(foundSubject);
    }

    @Override
    public CategoryGetDetailDto toDetailDto(Category entity) {
        return new CategoryGetDetailDto(entity.getId(), entity.getName());
    }

    @Override
    public CategoryGetListDto toListDto(Category entity) {
        return new CategoryGetListDto(
                entity.getId(),
                entity.getName(),
                entity.getSigns().size(),
                new NamedDtoWithId(entity.getSubject().getId(), entity.getSubject().getName()));
    }
}
