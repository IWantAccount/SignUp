package com.brodeckyondrej.SignUp.Universal.NamedEntity;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityService;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;

import java.util.List;
import java.util.stream.Collectors;

public abstract class NamedEntityService<
        Entity extends com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity,
        CreateDto extends NamedDto,
        UpdateDto extends NamedDto,
        GetDetailDto extends NamedDtoWithId,
        GetListDto extends NamedDtoWithId
        >

        extends EntityService<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> {

    NamedEntityRepository<Entity> namedRepository;

    protected NamedEntityService(NamedEntityRepository<Entity> repository,
                                 Validator<CreateDto, UpdateDto> validator,
                                 EntityMapper<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> mapper) {
        super(repository, validator, mapper);
        this.namedRepository = repository;
    }

    List<GetListDto> findByName(String name){
        return namedRepository.findByName(name)
                .stream()
                .map(mapper::toListDto)
                .collect(Collectors.toList());
    }
}
