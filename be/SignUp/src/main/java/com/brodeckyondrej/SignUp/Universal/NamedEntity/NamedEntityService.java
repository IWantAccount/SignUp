package com.brodeckyondrej.SignUp.Universal.NamedEntity;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityService;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public abstract class NamedEntityService<
        Entity extends com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity,
        CreateDto extends NamedDto,
        UpdateDto extends NamedDto,
        GetDetailDto extends NamedDtoWithId,
        GetListDto extends NamedDtoWithId
        >

        extends EntityService<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> {

    private final NamedEntityRepository<Entity> repository;
    private final Validator<CreateDto, UpdateDto> validator;
    private final EntityMapper<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> mapper;

    public NamedEntityService(NamedEntityRepository<Entity> repository,
                              Validator<CreateDto, UpdateDto> validator,
                              EntityMapper<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> mapper) {
        super(repository, validator, mapper);
        this.repository = repository;
        this.validator = validator;
        this.mapper = mapper;
    }

    List<GetListDto> findByName(String name){
        return repository.findByName(name)
                .stream()
                .map(mapper::toListDto)
                .collect(Collectors.toList());
    }
}
