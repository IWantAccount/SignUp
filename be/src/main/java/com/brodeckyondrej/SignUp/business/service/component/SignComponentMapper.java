package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.*;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class SignComponentMapper implements EntityMapper<SignComponent, SignComponentCreateDto, SignComponentUpdateDto, SignComponentGetDetailDto, SignComponentGetListDto> {
    @Override
    public SignComponent fromCreateDto(SignComponentCreateDto signComponentCreateDto) {
        return new SignComponent(signComponentCreateDto.getTextDescription(), signComponentCreateDto.getType());
    }

    @Override
    public void updateFromDto(SignComponent entity, SignComponentUpdateDto signComponentUpdateDto) {
        entity.setTextDescription(signComponentUpdateDto.getTextDescription());
    }

    @Override
    public SignComponentGetDetailDto toDetailDto(SignComponent entity) {
        if(entity == null) {
            return null;
        }

        return new SignComponentGetDetailDto(entity.getId(), entity.getTextDescription(), entity.getType());
    }

    @Override
    public SignComponentGetListDto toListDto(SignComponent entity) {
        if(entity == null) {
            return null;
        }
        return new SignComponentGetListDto(entity.getId(), entity.getTextDescription(), entity.getType());
    }
}
