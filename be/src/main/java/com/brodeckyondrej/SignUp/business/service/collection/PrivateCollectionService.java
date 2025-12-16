package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.business.specification.NameSpecification;
import com.brodeckyondrej.SignUp.business.specification.PrivateCollectionSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
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
    private final UserRepository userRepository;

    public PrivateCollectionService(PrivateCollectionRepository collectionRepository, PrivateCollectionValidator validator, PrivateCollectionMapper mapper,
                                    SignRepository signRepository, UserRepository userRepository) {
        super(collectionRepository, validator, mapper);
        this.privateCollectionRepository = collectionRepository;
        this.signRepository = signRepository;
        this.privateCollectionMapper = mapper;
        this.userRepository = userRepository;
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

    public Page<PrivateCollectionGetListDto> search(CollectionSearchDto dto, Pageable pageable) {
        User user = userRepository.findByIdOrThrow(dto.getOwnerId());
        Specification<PrivateCollection> spec = new SpecificationBuilder<PrivateCollection>()
                .addSpecIfNotNull(NameSpecification.hasNameLike(dto.getSearch()), dto.getSearch())
                .addSpec(PrivateCollectionSpecification.hasOwner(user))
                .build();

        return privateCollectionRepository.findAll(spec, pageable).map(privateCollectionMapper::toListDto);

    }

    public Page<SignInCollectionDto> getSignInCollection(CollectionSignSearchDto dto, Pageable pageable) {
        Sign sign = signRepository.findByIdOrThrow(dto.getSignId());
        User owner = userRepository.findByIdOrThrow(dto.getOwnerId());
        Specification<PrivateCollection> specs = new SpecificationBuilder<PrivateCollection>()
                .addSpecIfNotNull(NameSpecification.hasNameLike(dto.getCollectionName()), dto.getCollectionName())
                .addSpec(PrivateCollectionSpecification.hasOwner(owner))
                .build();

        return privateCollectionRepository.findAll(specs, pageable).map(collection ->
                privateCollectionMapper.toSignInCollectionDto(collection, sign));
    }

}
