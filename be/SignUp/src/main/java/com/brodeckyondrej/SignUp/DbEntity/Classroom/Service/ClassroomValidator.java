package com.brodeckyondrej.SignUp.DbEntity.Classroom.Service;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.ClassroomRepository;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.InputClassroomDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
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
