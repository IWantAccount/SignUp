package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Service;

import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
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
