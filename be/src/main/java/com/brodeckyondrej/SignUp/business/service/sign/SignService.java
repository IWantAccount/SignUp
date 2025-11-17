package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.SignCreateDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignUpdateDto;
import com.brodeckyondrej.SignUp.business.service.storage.FileSystemVideoStorage;
import com.brodeckyondrej.SignUp.business.service.storage.StorageService;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class SignService extends EntityService<Sign, SignCreateDto, SignUpdateDto, SignGetDetailDto, SignGetListDto> {

    private final SignRepository signRepository;
    private final SignMapper signMapper;
    private final PrivateCollectionRepository collectionRepository;
    private final CategoryRepository categoryRepository;
    private final FileSystemVideoStorage fileSystemVideoStorage;

    public SignService(SignRepository repository, SignValidator validator, SignMapper mapper,
                       PrivateCollectionRepository collectionRepository, CategoryRepository categoryRepository,
                       FileSystemVideoStorage fileSystemVideoStorage) {
        super(repository, validator, mapper);
        this.signRepository = repository;
        this.signMapper = mapper;
        this.collectionRepository = collectionRepository;
        this.categoryRepository = categoryRepository;
        this.fileSystemVideoStorage = fileSystemVideoStorage;
    }

    public Page<SignGetListDto> getByCategoryId(UUID categoryId, Pageable pageable) {
        Category category = categoryRepository.findByIdOrThrow(categoryId);
        return signRepository.findByCategory(category, pageable)
                .map(signMapper::toDetailDto);
    }

    public Page<SignGetListDto> getByPrivateCollectionId(UUID privateCollectionId, Pageable pageable) {
        PrivateCollection collection = collectionRepository.findByIdOrThrow(privateCollectionId);
        return signRepository.findDistinctByInPrivateCollectionsContains(collection, pageable)
                .map(signMapper::toDetailDto);
    }

    @Override
    public void delete(UUID id) {
        Optional<Sign> sign = signRepository.findById(id);
        if (sign.isEmpty()) {
            return;
        }

        //This is owned side of many to many relationship. it is necessary to delete relationships
        sign.get().getInPrivateCollections()
                .forEach(privateCollection -> privateCollection.removeSign(sign.get()));

        fileSystemVideoStorage.delete(sign.get().getVideoFileName());
        super.delete(id);
    }


    public SignGetDetailDto create(SignCreateDto dto, MultipartFile videoFile) {
        String fileName = fileSystemVideoStorage.store(videoFile);
        Sign sign = mapper.fromCreateDto(dto);
        sign.setVideoFileName(fileName);
        signRepository.save(sign);
        return signMapper.toDetailDto(sign);
    }

    public Page<SignGetListDto> getByTranslation(String search, Pageable pageable) {
        Page<Sign> res;
        if (search.isEmpty()) {
            res = signRepository.findAll(pageable);
        }
        else {
            res = signRepository.findByTranslation(search, pageable);
        }

        return res.map(signMapper::toListDto);
    }

    public Page<SignGetListDto> getByCategoryAndSearch(UUID categoryId, String search, Pageable pageable) {
        Category category = categoryRepository.findByIdOrThrow(categoryId);
        Page<Sign> res;

        if (search == null || search.isEmpty()) {
            res = signRepository.findByCategory(category, pageable);
        }
        else {
            res = signRepository.findByTranslationAndCategory(search, category, pageable);
        }

        return res.map(signMapper::toListDto);
    }

    public Page<SignGetListDto> getByPrivateCollectionAndSearch(UUID privateCollectionId, String search, Pageable pageable) {
        PrivateCollection privateCollection = collectionRepository.findByIdOrThrow(privateCollectionId);

        Page<Sign> res;
        if (search == null || search.isEmpty()) {
            res = signRepository.findDistinctByInPrivateCollectionsContains(privateCollection, pageable);
        }
        else {
            res = signRepository.findByTranslationAndPrivateCollection(search, privateCollection, pageable);
        }

        return res.map(signMapper::toListDto);
    }
}
