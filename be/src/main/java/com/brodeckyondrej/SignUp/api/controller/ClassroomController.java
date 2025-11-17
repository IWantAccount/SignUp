package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.business.service.classroom.ClassroomService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classroom")
public class ClassroomController extends NamedEntityController<Classroom, ClassroomCreateDto, ClassroomUpdateDto, ClassroomGetDetailDto, ClassroomGetListDto, FindByNameDto> {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService service){
        super(service);
        this.classroomService = service;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<ClassroomGetListDto>> search(@RequestBody @Valid FindByNameDto dto, Pageable pageable) {
        return ResponseEntity.ok(classroomService.search(dto, pageable));
    }
}
