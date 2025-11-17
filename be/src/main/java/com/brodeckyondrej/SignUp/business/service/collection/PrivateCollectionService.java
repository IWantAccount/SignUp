package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.business.specification.NameSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        List<Specification<PrivateCollection>> spec = new ArrayList<>();

        if(dto.getName() != null){
            spec.add(NameSpecification.hasNameLike(dto.getName()));
        }

        Specification<PrivateCollection> specification = Specification.allOf(spec);

        return privateCollectionRepository.findAll(specification, pageable).map(privateCollectionMapper::toListDto);

    }

}
