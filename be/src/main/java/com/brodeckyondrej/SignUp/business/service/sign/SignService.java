package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.*;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.HandNotationIdDto;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationIdDto;
import com.brodeckyondrej.SignUp.business.service.storage.FileSystemVideoStorage;
import com.brodeckyondrej.SignUp.business.service.storage.StorageService;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.business.specification.SignSpecification;
import com.brodeckyondrej.SignUp.persistence.embeded.SignNotation_;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
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

    public Page<SignGetListDto> search(SignSearchDto dto, Pageable pageable) {
        SpecificationBuilder<Sign> specBuilder = new SpecificationBuilder<Sign>();
        Category foundCategory = null;
        if(dto.getCategoryId() != null) {
            foundCategory = categoryRepository.findByIdOrThrow(dto.getCategoryId());
        }

        PrivateCollection foundPrivateCollection = null;
        if(dto.getCollectionId() != null) {
            foundPrivateCollection = collectionRepository.findByIdOrThrow(dto.getCollectionId());
        }

        specBuilder
                .addSpec(SignSpecification.hasTranslationLike(dto.getTranslationSearch()))
                .addSpec(SignSpecification.isInCategory(foundCategory))
                .addSpec(SignSpecification.isInPrivateCollection(foundPrivateCollection))
                .addSpec(SignSpecification.hasType(dto.getType()))
                .addSpec(SignSpecification.hasLanguageLevel(dto.getLanguageLevel()))
                .addSpec(SignSpecification.hasRegion(dto.getRegion()));


                if(dto.getNotation() != null) {
                    NotationIdDto notation = dto.getNotation();
                    specBuilder
                            .addSpecIfNotNull(SignSpecification.bothHandsUsed(notation.getBothHandsUsed()), notation.getBothHandsUsed())
                            .addSpecIfNotNull(SignSpecification.isAsymmetric(notation.getAsymmetricSign()), notation.getAsymmetricSign());

                    if(notation.getActiveHandNotation() != null) {
                        HandNotationIdDto handNotation = dto.getNotation().getActiveHandNotation();

                        specBuilder
                                .addSpec(SignSpecification.hasActiveHandShapeId(handNotation.getHandShapeId()))
                                .addSpec(SignSpecification.hasActivePalmOrientation(handNotation.getPalmOrientationId()))
                                .addSpec(SignSpecification.hasActiveFingerOrientation(handNotation.getFingerOrientationId()));
                    }

                    if(notation.getPassiveHandNotation() != null) {
                        HandNotationIdDto handNotation = dto.getNotation().getPassiveHandNotation();
                        specBuilder
                                .addSpec(SignSpecification.hasPassiveHandShapeId(handNotation.getHandShapeId()))
                                .addSpec(SignSpecification.hasPassivePalmOrientation(handNotation.getPalmOrientationId()))
                                .addSpec(SignSpecification.hasPassiveFingerOrientation(handNotation.getFingerOrientationId()));
                    }

                    specBuilder
                            .addSpec(SignSpecification.hasLocation(dto.getNotation().getArticulationLocationId()))
                            .addSpec(SignSpecification.hasMovement(dto.getNotation().getMovementId()))
                            .addSpec(SignSpecification.hasContact(dto.getNotation().getContactId()))
                            .addSpec(SignSpecification.hasHandArrangement(dto.getNotation().getHandArrangementId()));

                }

                Page<Sign> signs = signRepository.findAll(specBuilder.build(), pageable);

        return signs.map(signMapper::toListDto);
    }
}
