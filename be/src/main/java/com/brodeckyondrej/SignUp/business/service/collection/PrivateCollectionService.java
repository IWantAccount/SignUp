package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.business.specification.NameSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PrivateCollectionService extends NamedEntityService<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto
        > {

    private final PrivateCollectionRepository privateCollectionRepository;
    private final SignRepository signRepository;
    private final PrivateCollectionMapper privateCollectionMapper;

    public PrivateCollectionService(PrivateCollectionRepository collectionRepository, PrivateCollectionValidator validator, PrivateCollectionMapper mapper,
                                    SignRepository signRepository) {
        super(collectionRepository, validator, mapper);
        this.privateCollectionRepository = collectionRepository;
        this.signRepository = signRepository;
        this.privateCollectionMapper = mapper;
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

    public Page<PrivateCollectionGetListDto> search(FindByNameDto dto, Pageable pageable) {
        Specification<PrivateCollection> spec = new SpecificationBuilder<PrivateCollection>()
                .addSpecIfNotNull(NameSpecification.hasNameLike(dto.getName()), dto.getName())
                .build();

        return privateCollectionRepository.findAll(spec, pageable).map(privateCollectionMapper::toListDto);

    }

}
