package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.service.category.CategoryMapper;
import com.brodeckyondrej.SignUp.business.dto.sign.CreateSignDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.UpdateSignDto;
import com.brodeckyondrej.SignUp.business.service.storage.FileSystemVideoStorage;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.business.service.component.SignComponentMapper;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetListDto;
import com.brodeckyondrej.SignUp.business.service.subject.SubjectMapper;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SignComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class SignMapper implements EntityMapper<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    private final CategoryMapper categoryMapper;
    private final SignComponentMapper signComponentMapper;
    private final SignComponentRepository signComponentRepository;
    private final CategoryRepository categoryRepository;
    private final SubjectMapper subjectMapper;
    private final FileSystemVideoStorage videoStorage;

    public SignMapper(CategoryMapper categoryMapper, SignComponentMapper signComponentMapper, SignComponentRepository signComponentRepository,
                      CategoryRepository categoryRepository, SubjectMapper subjectMapper, FileSystemVideoStorage videoStorage) {
        this.categoryMapper = categoryMapper;
        this.signComponentMapper = signComponentMapper;
        this.signComponentRepository = signComponentRepository;
        this.categoryRepository = categoryRepository;
        this.subjectMapper = subjectMapper;
        this.videoStorage = videoStorage;
    }

    @Override
    public Sign fromCreateDto(CreateSignDto createSignDto) {
        Category category = categoryRepository.findByIdOrThrow(createSignDto.getCategoryId());

        SignComponent handShape = findAndValidateSignComponent(SignComponentType.HAND_SHAPE, createSignDto.getHandShapeId());
        SignComponent signLocation = findAndValidateSignComponent(SignComponentType.LOCATION, createSignDto.getSignLocationId());
        SignComponent movement = findAndValidateSignComponent(SignComponentType.MOVEMENT, createSignDto.getMovementId());
        SignComponent palmOrientation = findAndValidateSignComponent(SignComponentType.PALM_ORIENTATION, createSignDto.getPalmOrientationId());
        SignComponent fingerOrientation = findAndValidateSignComponent(SignComponentType.FINGER_ORIENTATION, createSignDto.getFingerOrientationId());
        SignComponent contactRegion = findAndValidateSignComponent(SignComponentType.CONTACT_REGION, createSignDto.getContactRegionId());
        SignComponent handArrangementId = findAndValidateSignComponent(SignComponentType.HAND_ARRANGEMENT, createSignDto.getHandArrangementId());

        String fileName = videoStorage.store(createSignDto.getVideo());

        Sign newSign = new Sign();
        newSign.setCategory(category);
        newSign.setType(createSignDto.getType());
        newSign.setLanguageLevel(createSignDto.getLanguageLevel());
        newSign.setRegion(createSignDto.getRegion());
        newSign.setTranslations(createSignDto.getTranslations());
        newSign.setExplanation(createSignDto.getExplanation());
        newSign.setVideoFileName(fileName);

        newSign.setHandShape(handShape);
        newSign.setLocation(signLocation);
        newSign.setMovementComponent(movement);
        newSign.setPalmOrientation(palmOrientation);
        newSign.setFingerOrientation(fingerOrientation);
        newSign.setContactRegion(contactRegion);
        newSign.setHandArrangement(handArrangementId);
        newSign.setType(createSignDto.getType());

        return newSign;
    }

    @Override
    public void updateFromDto(Sign entity, UpdateSignDto updateSignDto) {
        Category category = categoryRepository.findByIdOrThrow(updateSignDto.getCategoryId());

        SignComponent handShape = findAndValidateSignComponent(SignComponentType.HAND_SHAPE, updateSignDto.getHandShapeId());
        SignComponent signLocation = findAndValidateSignComponent(SignComponentType.LOCATION, updateSignDto.getSignLocationId());
        SignComponent movement = findAndValidateSignComponent(SignComponentType.MOVEMENT, updateSignDto.getMovementId());
        SignComponent palmOrientation = findAndValidateSignComponent(SignComponentType.PALM_ORIENTATION, updateSignDto.getPalmOrientationId());
        SignComponent fingerOrientation = findAndValidateSignComponent(SignComponentType.FINGER_ORIENTATION, updateSignDto.getFingerOrientationId());
        SignComponent contactRegion = findAndValidateSignComponent(SignComponentType.CONTACT_REGION, updateSignDto.getContactRegionId());
        SignComponent handArrangementId = findAndValidateSignComponent(SignComponentType.HAND_ARRANGEMENT, updateSignDto.getHandArrangementId());

        if(updateSignDto.getType() != null){
            entity.setType(updateSignDto.getType());
        }

        if(updateSignDto.getCategoryId() != null) {
            entity.setCategory(categoryRepository.findByIdOrThrow(updateSignDto.getCategoryId()));
        }

        if(handShape != null) {
            entity.setHandShape(handShape);
        }

        if(signLocation != null){
            entity.setLocation(signLocation);
        }

        if(movement != null) {
            entity.setMovementComponent(movement);
        }

        if(palmOrientation != null) {
            entity.setPalmOrientation(palmOrientation);
        }
        if(fingerOrientation != null) {
            entity.setFingerOrientation(fingerOrientation);
        }

        if(contactRegion != null) {
            entity.setContactRegion(contactRegion);
        }

        if(handArrangementId != null) {
            entity.setHandArrangement(handArrangementId);
        }

        entity.setCategory(category);
        entity.setType(updateSignDto.getType());
        entity.setLanguageLevel(updateSignDto.getLanguageLevel());
        entity.setRegion(updateSignDto.getRegion());
        entity.setExplanation(updateSignDto.getExplanation());
        entity.setTranslations(updateSignDto.getTranslations());

    }

    @Override
    public SignGetDetailDto toDetailDto(Sign entity) {
        CategoryGetListDto categoryDto = categoryMapper.toListDto(entity.getCategory());
        SubjectGetListDto subjectDto = subjectMapper.toListDto(entity.getCategory().getSubject());

        return new SignGetDetailDto(
                entity.getId(), categoryDto, entity.getTranslations(),
                subjectDto, entity.getRegion(), entity.getLanguageLevel(),
                entity.getType(), entity.getExplanation(), signComponentMapper.toListDto(entity.getHandShape()),
                signComponentMapper.toListDto(entity.getLocation()), signComponentMapper.toListDto(entity.getMovementComponent()),
                signComponentMapper.toListDto(entity.getPalmOrientation()), signComponentMapper.toListDto(entity.getFingerOrientation()),
                signComponentMapper.toListDto(entity.getContactRegion()), signComponentMapper.toListDto(entity.getHandArrangement()), entity.getVideoFileName()
        );
    }

    @Override
    public SignGetListDto toListDto(Sign entity) {
        CategoryGetListDto categoryDto = categoryMapper.toListDto(entity.getCategory());
        return new SignGetListDto(entity.getId(), entity.getVideoFileName(), categoryDto, entity.getTranslations());
    }

    private SignComponent findAndValidateSignComponent(SignComponentType requiredType, UUID id) {
        if (id == null) {
            return null;
        }

        SignComponent foundComponent = signComponentRepository.findByIdOrThrow(id);
        if (!foundComponent.getType().equals(requiredType)) {
            throw new ValidationException("Id and component mismatch");
        }

        return foundComponent;
    }
}
