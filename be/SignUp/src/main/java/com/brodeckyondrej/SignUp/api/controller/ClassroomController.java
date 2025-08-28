package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.InputClassroomDto;
import com.brodeckyondrej.SignUp.business.service.classroom.ClassroomService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classroom")
public class ClassroomController extends NamedEntityController<Classroom, InputClassroomDto, InputClassroomDto, GetClassroomDetailDto, GetClassroomListDto, FindByNameDto> {

    public ClassroomController(ClassroomService service){
        super(service);
    }
}
