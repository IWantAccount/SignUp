package com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.BaseEntity;
import org.springframework.stereotype.Service;

@Service
public interface EntityMapper<
        Entity extends BaseEntity,
        CreateDto,
        UpdateDto,
        GetDetailDto,
        ListDto
        > {

    public Entity fromCreateDto(CreateDto createDto);
    public void updateFromDto(Entity entity, UpdateDto updateDto);
    public GetDetailDto toDetailDto(Entity entity);
    public ListDto toListDto(Entity entity);
}
