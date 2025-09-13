package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PrivateCollectionValidator implements Validator<PrivateCollectionCreateDto, PrivateCollectionUpdateDto> {
    @Override
    public void validateCreateOrThrow(PrivateCollectionCreateDto privateCollectionCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, PrivateCollectionUpdateDto privateCollectionUpdateDto) {

    }
}
