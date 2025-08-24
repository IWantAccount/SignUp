package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Service;

import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.PrivateCollection;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
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
