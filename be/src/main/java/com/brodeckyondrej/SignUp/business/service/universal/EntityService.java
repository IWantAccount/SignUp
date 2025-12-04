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

    public GetDetailDto create(CreateDto createDto) {
        validator.validateCreateOrThrow(createDto);
        Entity res = repository.save(mapper.fromCreateDto(createDto));
        return mapper.toDetailDto(res);
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

    private final Set<String> notAllowedIds = Set.of(
            "id1",
            "id2"
    );

    public void delete(UUID id){
        if(notAllowedIds.contains(id.toString())) {
            throw new BadTesterException("Objekt je nutný pro testování. Nemažte to.");
        }
        Entity found = repository.findByIdOrThrow(id);
        repository.delete(found);
    }

}
