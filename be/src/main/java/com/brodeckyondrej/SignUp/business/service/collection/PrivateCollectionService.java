package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionGetListDto;
import com.brodeckyondrej.SignUp.business.dto.collection.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class PrivateCollectionService extends NamedEntityService<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto
        > {

    public PrivateCollectionService(PrivateCollectionRepository repository, PrivateCollectionValidator validator, PrivateCollectionMapper mapper) {
        super(repository, validator, mapper);
    }

}
