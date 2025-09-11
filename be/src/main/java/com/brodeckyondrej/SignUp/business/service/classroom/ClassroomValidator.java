package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.UpdateClassroomDto;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.CreateClassroomDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClassroomValidator implements Validator<CreateClassroomDto, UpdateClassroomDto> {

    @Autowired
    ClassroomRepository classroomRepository;

    @Override
    public void validateCreateOrThrow(CreateClassroomDto inputClassroomDto) {
        // no extra validation
    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, UpdateClassroomDto inputClassroomDto) {
        //throws missing object exception if classroom is not presented
        classroomRepository.findByIdOrThrow(originalId);
    }

}
