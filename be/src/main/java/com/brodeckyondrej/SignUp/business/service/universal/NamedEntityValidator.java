package com.brodeckyondrej.SignUp.business.service.universal;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import com.brodeckyondrej.SignUp.exception.NameNotUniqueException;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import com.brodeckyondrej.SignUp.persistence.repository.NamedEntityRepository;
import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
public class NamedEntityValidator<E extends NamedEntity, CreateDto extends NamedDto, UpdateDto extends NamedDto> implements Validator<CreateDto, UpdateDto>{
    private NamedEntityRepository<E> repository;

    @Override
    public void validateCreateOrThrow(CreateDto createDto) {
        if(repository.existsByName(createDto.getName())) {
            throw new NameNotUniqueException("Jméno musí být unikátní");
        }
    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateDto updateDto) {
        if(repository.existsByName(updateDto.getName())) {
            throw new NameNotUniqueException("Jméno musí být unikátní");
        }
    }

    protected NamedEntityValidator(){

    }
}
