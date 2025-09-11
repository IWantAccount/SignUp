package com.brodeckyondrej.SignUp.business.service.universal;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import com.brodeckyondrej.SignUp.persistence.repository.NamedEntityRepository;

import java.util.List;
import java.util.stream.Collectors;

public abstract class NamedEntityService<
        Entity extends NamedEntity,
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

    public List<GetListDto> findByName(String name){
        return namedRepository.findByName(name)
                .stream()
                .map(mapper::toListDto)
                .collect(Collectors.toList());
    }
}
