package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.UpdateClassroomDto;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.CreateClassroomDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class ClassroomService extends NamedEntityService<Classroom, CreateClassroomDto, UpdateClassroomDto, GetClassroomDetailDto, GetClassroomListDto> {

    public ClassroomService(ClassroomRepository repository, ClassroomValidator validator, ClassroomMapper mapper ) {
        super(repository, validator, mapper);
    }


}
