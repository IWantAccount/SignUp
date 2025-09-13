package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import org.springframework.stereotype.Service;

@Service
public class PrivateCollectionService extends NamedEntityService<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto
        > {

    private final PrivateCollectionRepository privateCollectionRepository;
    private final SignRepository signRepository;

    public PrivateCollectionService(PrivateCollectionRepository collectionRepository, PrivateCollectionValidator validator, PrivateCollectionMapper mapper,
                                    SignRepository signRepository) {
        super(collectionRepository, validator, mapper);
        this.privateCollectionRepository = collectionRepository;
        this.signRepository = signRepository;
    }

    public void addSignToPrivateCollection(CollectionSignDto dto){
        PrivateCollection collection = privateCollectionRepository.findByIdOrThrow(dto.getCollectionId());
        Sign sign = signRepository.findByIdOrThrow(dto.getSignId());
        collection.addSign(sign);
    }

    public void removeSignFromPrivateCollection(CollectionSignDto dto){
        PrivateCollection collection = privateCollectionRepository.findByIdOrThrow(dto.getCollectionId());
        Sign sign = signRepository.findByIdOrThrow(dto.getSignId());
        collection.removeSign(sign);
    }

}
