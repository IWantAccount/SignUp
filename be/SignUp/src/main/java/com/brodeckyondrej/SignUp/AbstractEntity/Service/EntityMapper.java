package com.brodeckyondrej.SignUp.AbstractEntity.Service;

import com.brodeckyondrej.SignUp.AbstractEntity.BaseEntity;
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
    public UpdateDto updateFromDto(Entity entity, UpdateDto updateDto);
    public GetDetailDto toDetailDto(Entity entity);
    public ListDto toListDto(Entity entity);
}
