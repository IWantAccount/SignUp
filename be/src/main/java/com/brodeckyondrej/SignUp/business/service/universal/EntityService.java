package com.brodeckyondrej.SignUp.business.service.universal;

import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import com.brodeckyondrej.SignUp.persistence.repository.EntityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;
/**
 * Parent of service classes. Has default implementation which can be overwritten
 * */
@Transactional
@RequiredArgsConstructor
public abstract class EntityService<
        Entity extends BaseEntity,
        CreateDto,
        UpdateDto,
        GetDetailDto,
        GetListDto
        > {

    protected final EntityRepository<Entity> repository;

    protected final Validator<CreateDto, UpdateDto> validator;

    protected final EntityMapper<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> mapper;

    /**
     * Validates given dto and saves it to db
     * @return created entity mapped to GetDetailDto
     * */
    public GetDetailDto create(CreateDto createDto) {
        validator.validateCreateOrThrow(createDto);
        Entity res = repository.save(mapper.fromCreateDto(createDto));
        return mapper.toDetailDto(res);
    }

    /**
     * Gets page of data based on pageable and maps it to GetListDto
     * */
    @Transactional()
    public Page<GetListDto> getAllPaged(Pageable pageable){
        return repository.findAll(pageable)
                .map(mapper::toListDto);
    }

    /**
     * @return Entity with given id mapped to GetDetailDto
     * @throws MissingObjectException if entity with given ID is not found.
     * */
    public GetDetailDto getById(UUID id){
        return mapper.toDetailDto(repository.findByIdOrThrow(id));
    }

    /**
     * Updates given entity.
     * @throws MissingObjectException if entity with given ID is not found.
     */
    public GetDetailDto update(UUID id, UpdateDto updateDto) {
        validator.validateUpdateOrThrow(id, updateDto);
        Entity found = repository.findByIdOrThrow(id);
        mapper.updateFromDto(found, updateDto);
        return mapper.toDetailDto(found);
    }

    /**
     * deletes given entity
     * @throws MissingObjectException if entity with given ID is not found.
     */
    public void delete(UUID id){
        Entity found = repository.findByIdOrThrow(id);
        repository.delete(found);
    }

}
