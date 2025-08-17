package com.brodeckyondrej.SignUp.DbEntity.Classroom;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomListDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.InputClassroomDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Service.ClassroomService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classroom")
public class ClassroomController extends NamedEntityController<Classroom, InputClassroomDto, InputClassroomDto, GetClassroomDetailDto, GetClassroomListDto, FindByNameDto> {

    public ClassroomController(ClassroomService service){
        super(service);
    }
}
