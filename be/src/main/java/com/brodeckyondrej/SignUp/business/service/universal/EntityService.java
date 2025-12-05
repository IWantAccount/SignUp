package com.brodeckyondrej.SignUp.business.service.universal;

import com.brodeckyondrej.SignUp.exception.BadTesterException;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import com.brodeckyondrej.SignUp.persistence.repository.EntityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;
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

    private final Set<String> forbiddenIds = Set.of(
            "eee5a9c3-612f-477f-b883-468192819686",
            "7dcc2e48-fdd1-4ef4-8afd-8cc508eaf367",
            "bb9499ac-2cbb-4c32-9122-e621a46992fd"
    );

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

        if(forbiddenIds.contains(id.toString())) {
            throw new BadTesterException("Tento objekt je součástí testu. Neměnit!!");
        }

        validator.validateUpdateOrThrow(id, updateDto);
        Entity found = repository.findByIdOrThrow(id);
        mapper.updateFromDto(found, updateDto);
        return mapper.toDetailDto(found);
    }

    public void delete(UUID id){

        if(forbiddenIds.contains(id.toString())) {
            throw new BadTesterException("Tento objekt je součásti testu. Nemazat!!");
        }

        Entity found = repository.findByIdOrThrow(id);
        repository.delete(found);
    }

}
