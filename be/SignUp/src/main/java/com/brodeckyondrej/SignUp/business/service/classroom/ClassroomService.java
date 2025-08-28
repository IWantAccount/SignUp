package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.entity.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.InputClassroomDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class ClassroomService extends NamedEntityService<Classroom, InputClassroomDto, InputClassroomDto, GetClassroomDetailDto, GetClassroomListDto> {

    public ClassroomService(ClassroomRepository repository, ClassroomValidator validator, ClassroomMapper mapper ) {
        super(repository, validator, mapper);
    }


}
