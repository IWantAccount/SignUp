package com.brodeckyondrej.SignUp.business.service.universal;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import com.brodeckyondrej.SignUp.exception.NameNotUniqueException;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import com.brodeckyondrej.SignUp.persistence.repository.NamedEntityRepository;

import java.util.Optional;
import java.util.UUID;

public class NamedEntityValidator<E extends NamedEntity, CreateDto extends NamedDto, UpdateDto extends NamedDto> implements Validator<CreateDto, UpdateDto>{
    private final NamedEntityRepository<E> repository;

    @Override
    public void validateCreateOrThrow(CreateDto createDto) {
        if(repository.existsByName(createDto.getName())) {
            throw new NameNotUniqueException("Jméno musí být unikátní");
        }
    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateDto updateDto) {
        Optional<E> entity = repository.findByName(updateDto.getName());
        if(entity.isPresent() && !entity.get().getId().equals(originalId)) {
            throw new NameNotUniqueException("Jméno musí být unikátní");
        }
    }

    public NamedEntityValidator(NamedEntityRepository<E> repository) {
        this.repository = repository;
    }
}
