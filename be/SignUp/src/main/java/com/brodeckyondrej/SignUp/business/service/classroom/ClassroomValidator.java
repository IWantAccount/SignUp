package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.persistence.entity.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.InputClassroomDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClassroomValidator implements Validator<InputClassroomDto, InputClassroomDto> {

    @Autowired
    ClassroomRepository classroomRepository;

    @Override
    public void validateCreateOrThrow(InputClassroomDto inputClassroomDto) {
        // no extra validation
    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, InputClassroomDto inputClassroomDto) {
        //throws missing object exception if classroom is not presented
        classroomRepository.findByIdOrThrow(originalId);
    }

}
