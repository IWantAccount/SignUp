package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PrivateCollectionValidator extends NamedEntityValidator<PrivateCollection, PrivateCollectionCreateDto, PrivateCollectionUpdateDto> {
    @Override
    public void validateCreateOrThrow(PrivateCollectionCreateDto privateCollectionCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, PrivateCollectionUpdateDto privateCollectionUpdateDto) {

    }

    public PrivateCollectionValidator(PrivateCollectionRepository repository) {
        super(repository);
    }
}
