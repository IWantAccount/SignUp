package com.brodeckyondrej.SignUp.business.service.universal;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import com.brodeckyondrej.SignUp.persistence.repository.NamedEntityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

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
                                 NamedEntityValidator<Entity, CreateDto, UpdateDto> validator,
                                 EntityMapper<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> mapper) {
        super(repository, validator, mapper);
        this.namedRepository = repository;
    }

    @Transactional
    public Page<GetListDto> findByName(String name, Pageable pageable){
        if(name.isEmpty()){
            return super.getAllPaged(pageable);
        }
        return namedRepository.findByNameContainingIgnoreCase(name, pageable)
                .map(mapper::toListDto);
    }
}
