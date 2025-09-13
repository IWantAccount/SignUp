package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentDto;
import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class SignComponentMapper implements EntityMapper<SignComponent, ComponentDto, ComponentDto, ComponentIdDto, ComponentIdDto> {
    @Override
    public SignComponent fromCreateDto(ComponentDto componentDto) {
        return new SignComponent(componentDto.getComponent(), componentDto.getType());
    }

    @Override
    public void updateFromDto(SignComponent entity, ComponentDto componentDto) {
        entity.setComponent(componentDto.getComponent());
        entity.setType(componentDto.getType());
    }

    @Override
    public ComponentIdDto toDetailDto(SignComponent entity) {
        if (entity == null) {
            return null;
        }
        return new ComponentIdDto(entity.getId(), entity.getComponent(), entity.getType());
    }

    @Override
    public ComponentIdDto toListDto(SignComponent entity) {
        if(entity == null) {
            return null;
        }
        return new ComponentIdDto(entity.getId(), entity.getComponent(), entity.getType());
    }
}
