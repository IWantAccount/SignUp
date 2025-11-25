package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.category.CategoryGetListDto;
import com.brodeckyondrej.SignUp.business.dto.component.SignComponentGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.HandNotationDto;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.HandNotationIdDto;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationDto;
import com.brodeckyondrej.SignUp.business.dto.sign.notation.NotationIdDto;
import com.brodeckyondrej.SignUp.business.service.category.CategoryMapper;
import com.brodeckyondrej.SignUp.business.dto.sign.SignCreateDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignUpdateDto;
import com.brodeckyondrej.SignUp.business.service.storage.FileSystemVideoStorage;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import com.brodeckyondrej.SignUp.persistence.embeded.HandNotation;
import com.brodeckyondrej.SignUp.persistence.embeded.SignNotation;
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
public class SignMapper implements EntityMapper<Sign, SignCreateDto, SignUpdateDto, SignGetDetailDto, SignGetListDto> {

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
    public Sign fromCreateDto(SignCreateDto signCreateDto) {
        Category category = categoryRepository.findByIdOrThrow(signCreateDto.getCategoryId());

        SignNotation signNotation = findAndValidateNotation(signCreateDto.getNotation());

        Sign newSign = new Sign();
        newSign.setCategory(category);
        newSign.setType(signCreateDto.getType());
        newSign.setLanguageLevel(signCreateDto.getLanguageLevel());
        newSign.setRegion(signCreateDto.getRegion());
        newSign.setTranslations(signCreateDto.getTranslations());
        newSign.setExplanation(signCreateDto.getExplanation());
        newSign.setSignNotation(signNotation);
        newSign.setType(signCreateDto.getType());

        return newSign;
    }

    @Override
    public void updateFromDto(Sign entity, SignUpdateDto signUpdateDto) {
        Category category = categoryRepository.findByIdOrThrow(signUpdateDto.getCategoryId());
        SignNotation notation = findAndValidateNotation(signUpdateDto.getNotation());

        entity.setCategory(category);
        entity.setSignNotation(notation);
        entity.setType(signUpdateDto.getType());
        entity.setLanguageLevel(signUpdateDto.getLanguageLevel());
        entity.setRegion(signUpdateDto.getRegion());
        entity.setExplanation(signUpdateDto.getExplanation());
        entity.setTranslations(signUpdateDto.getTranslations());
    }

    @Override
    public SignGetDetailDto toDetailDto(Sign entity) {
        CategoryGetListDto categoryDto = categoryMapper.toListDto(entity.getCategory());
        SubjectGetListDto subjectDto = subjectMapper.toListDto(entity.getCategory().getSubject());

        return new SignGetDetailDto(
                entity.getId(), categoryDto, entity.getTranslations(),
                subjectDto, entity.getRegion(), entity.getLanguageLevel(),
                entity.getType(), entity.getExplanation(), mapNotationToDto(entity.getSignNotation()), entity.getVideoFileName()
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
            throw new ValidationException("Id and component type mismatch");
        }

        return foundComponent;
    }

    private NotationDto mapNotationToDto(SignNotation notation){
        HandNotationDto activeHand = mapHandNotationToDto(notation.getActiveHandNotation());
        HandNotationDto passiveHand = mapHandNotationToDto(notation.getPassiveHandNotation());

        return new NotationDto(
                notation.isBothHandsUsed(),
                notation.isAsymmetricSign(),
                activeHand,
                passiveHand,
                signComponentMapper.toListDto(notation.getArticulationLocation()),
                signComponentMapper.toListDto(notation.getMovement()),
                signComponentMapper.toListDto(notation.getContact()),
                signComponentMapper.toListDto(notation.getHandArrangement())
        );
    }

    private HandNotationDto mapHandNotationToDto(HandNotation handNotation){
        SignComponentGetListDto handShape = signComponentMapper.toListDto(handNotation.getHandShape());
        SignComponentGetListDto palmOrientation = signComponentMapper.toListDto(handNotation.getPalmOrientation());
        SignComponentGetListDto fingerOrientation = signComponentMapper.toListDto(handNotation.getFingerOrientation());

        return new HandNotationDto(handShape, palmOrientation, fingerOrientation);
    }

    private SignNotation findAndValidateNotation(NotationIdDto dto){
        if(dto == null){
            HandNotation activeHandNotation = new HandNotation();
            HandNotation passiveHandNotation = new HandNotation();

            SignNotation emptyNotation = new SignNotation();
            emptyNotation.setActiveHandNotation(activeHandNotation);
            emptyNotation.setPassiveHandNotation(passiveHandNotation);

            return emptyNotation;
        }

        HandNotation activeHand = findAndValidateHandNotation(dto.getActiveHandNotation());

        HandNotation passiveHand = null;
        if(dto.getBothHandsUsed() && dto.getAsymmetricSign()){
            passiveHand = findAndValidateHandNotation(dto.getPassiveHandNotation());
        }

        SignNotation result = new SignNotation();

        result.setBothHandsUsed(dto.getBothHandsUsed());
        result.setAsymmetricSign(dto.getAsymmetricSign());
        result.setActiveHandNotation(activeHand);
        result.setPassiveHandNotation(passiveHand);
        result.setArticulationLocation(findAndValidateSignComponent(
                SignComponentType.LOCATION,
                dto.getArticulationLocationId()
        ));
        result.setMovement(findAndValidateSignComponent(
                SignComponentType.MOVEMENT,
                dto.getMovementId()
        ));
        result.setContact(findAndValidateSignComponent(
                SignComponentType.CONTACT,
                dto.getContactId()
        ));
        result.setHandArrangement(findAndValidateSignComponent(
                SignComponentType.HAND_ARRANGEMENT,
                dto.getHandArrangementId()
        ));
        return result;
    }

    private HandNotation findAndValidateHandNotation(HandNotationIdDto dto){
        SignComponent handShape = findAndValidateSignComponent(SignComponentType.HAND_SHAPE, dto.getHandShapeId());
        SignComponent palmOrientation = findAndValidateSignComponent(SignComponentType.PALM_ORIENTATION, dto.getPalmOrientationId());
        SignComponent fingerOrientation = findAndValidateSignComponent(SignComponentType.FINGER_ORIENTATION, dto.getFingerOrientationId());

        return new HandNotation(handShape, palmOrientation, fingerOrientation);
    }
}
