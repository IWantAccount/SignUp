package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClassroomValidator implements Validator<ClassroomCreateDto, ClassroomUpdateDto> {

    @Autowired
    ClassroomRepository classroomRepository;

    @Override
    public void validateCreateOrThrow(ClassroomCreateDto inputClassroomDto) {
        // no extra validation
    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, ClassroomUpdateDto inputClassroomDto) {
        //throws missing object exception if classroom is not presented
        classroomRepository.findByIdOrThrow(originalId);
    }

}
