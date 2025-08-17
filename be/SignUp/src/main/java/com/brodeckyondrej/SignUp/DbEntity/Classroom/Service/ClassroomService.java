package com.brodeckyondrej.SignUp.DbEntity.Classroom.Service;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.ClassroomRepository;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomListDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.InputClassroomDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import org.springframework.stereotype.Service;

@Service
public class ClassroomService extends NamedEntityService<Classroom, InputClassroomDto, InputClassroomDto, GetClassroomDetailDto, GetClassroomListDto> {

    public ClassroomService(ClassroomRepository repository, ClassroomValidator validator, ClassroomMapper mapper ) {
        super(repository, validator, mapper);
    }


}
