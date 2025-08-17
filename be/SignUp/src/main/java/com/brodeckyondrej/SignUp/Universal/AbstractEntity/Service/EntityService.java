package com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.BaseEntity;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.EntityRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;
import java.util.List;


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

    public GetDetailDto create(CreateDto createDto) {
        validator.validateCreateOrThrow(createDto);
        Entity res = repository.save(mapper.fromCreateDto(createDto));
        return mapper.toDetailDto(res);
    }

    //For debug
    //TODO remove before publishing
    public List<GetListDto> getAll(){
        return repository.findAll()
                .stream()
                .map(mapper::toListDto)
                .collect(Collectors.toList());
    }

    @Transactional()
    public Page<GetListDto> getAllPaged(Pageable pageable){
        return repository.findAll(pageable)
                .map(mapper::toListDto);
    }

    public GetDetailDto getById(UUID id){
        return mapper.toDetailDto(repository.findByIdOrThrow(id));
    }

    public GetDetailDto update(UUID id, UpdateDto updateDto) {
        validator.validateUpdateOrThrow(id, updateDto);
        Entity found = repository.findByIdOrThrow(id);
        mapper.updateFromDto(found, updateDto);
        return mapper.toDetailDto(found);
    }

    public void delete(UUID id){
        Entity found = repository.findByIdOrThrow(id);
        repository.delete(found);
    }

}
