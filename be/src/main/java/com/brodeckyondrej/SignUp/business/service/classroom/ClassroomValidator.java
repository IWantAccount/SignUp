package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityValidator;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import org.springframework.stereotype.Service;

@Service
public class ClassroomValidator extends NamedEntityValidator<Classroom, ClassroomCreateDto, ClassroomUpdateDto> {


}
