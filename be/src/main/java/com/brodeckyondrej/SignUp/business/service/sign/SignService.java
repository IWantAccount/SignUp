package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.CreateSignDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.UpdateSignDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class SignService extends EntityService<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    private final SignRepository signRepository;
    private final SignMapper signMapper;
    private final PrivateCollectionRepository collectionRepository;
    private final CategoryRepository categoryRepository;

    public SignService(SignRepository repository, SignValidator validator, SignMapper mapper,
                       PrivateCollectionRepository collectionRepository, CategoryRepository categoryRepository) {
        super(repository, validator, mapper);
        this.signRepository = repository;
        this.signMapper = mapper;
        this.collectionRepository = collectionRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<SignGetListDto> getByCategoryId(UUID categoryId, Pageable pageable){
        Category category = categoryRepository.findByIdOrThrow(categoryId);
        return signRepository.findByCategory(category, pageable)
                .map(signMapper::toDetailDto);
    }

    public Page<SignGetListDto> getByPrivateCollectionId(UUID privateCollectionId, Pageable pageable){
        PrivateCollection collection = collectionRepository.findByIdOrThrow(privateCollectionId);
        return signRepository.findDistinctByInPrivateCollectionsContains(collection, pageable)
                .map(signMapper::toDetailDto);
    }
}
