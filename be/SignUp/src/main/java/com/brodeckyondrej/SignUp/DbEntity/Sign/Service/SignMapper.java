package com.brodeckyondrej.SignUp.DbEntity.Sign.Service;

import com.brodeckyondrej.SignUp.DbEntity.Category.Dto.CategoryGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Category.Service.CategoryMapper;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.CreateSignDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.SignGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.SignGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Dto.UpdateSignDto;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Sign;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Service.SignComponentMapper;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.SubjectGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectMapper;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Service;

//TODO fix types
@Service
public class SignMapper implements EntityMapper<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    private final CategoryMapper categoryMapper;
    private final SignComponentMapper signComponentMapper;
    private final SubjectMapper subjectMapper;

    @Override
    public Sign fromCreateDto(CreateSignDto createSignDto) {
        return null;
    }

    @Override
    public void updateFromDto(Sign entity, UpdateSignDto updateSignDto) {

    }

    @Override
    public SignGetDetailDto toDetailDto(Sign entity) {
        CategoryGetListDto categoryDto = categoryMapper.toListDto(entity.getCategory());
        SubjectGetListDto subjectDto = subjectMapper.toListDto(entity.getCategory().getSubject());

        return new SignGetDetailDto(
                entity.getId(), categoryDto, entity.getTranslations(),
                subjectDto, entity.getRegion(), entity.getLanguageLevel(),
                entity.getType(), entity.getExplanation(), signComponentMapper.toListDto(entity.getHandShape()),
                signComponentMapper.toListDto(entity.getLocation()), signComponentMapper.toListDto(entity.getMovementComponent()),
                signComponentMapper.toListDto(entity.getPalmOrientation()), signComponentMapper.toListDto(entity.getFingerOrientation()),
                signComponentMapper.toListDto(entity.getContactRegion()), signComponentMapper.toListDto(entity.getHandArrangement())
        );
    }

    @Override
    public SignGetListDto toListDto(Sign entity) {
        CategoryGetListDto categoryDto = categoryMapper.toListDto(entity.getCategory());
        return new SignGetListDto(entity.getId(), categoryDto, entity.getTranslations());
    }

    public SignMapper(CategoryMapper categoryMapper, SignComponentMapper signComponentMapper, SubjectMapper subjectMapper) {
        this.categoryMapper = categoryMapper;
        this.signComponentMapper = signComponentMapper;
        this.subjectMapper = subjectMapper;
    }
}
