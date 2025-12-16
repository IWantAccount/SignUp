package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.business.dto.user.StudentClassroomDto;
import com.brodeckyondrej.SignUp.business.service.classroom.ClassroomService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacher;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacherOrSelf;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

    @Override
    @PostMapping()
    @AtLeastTeacher
    public ResponseEntity<ClassroomGetDetailDto> create(@Valid @RequestBody ClassroomCreateDto dto) {
        return super.create(dto);
    }

    @Override
    @PutMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<ClassroomGetDetailDto> update(@Valid @RequestBody ClassroomUpdateDto dto, @PathVariable UUID id) {
        return super.update(dto, id);
    }

    @Override
    @DeleteMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return super.delete(id);
    }


    @PostMapping("/student-present")
    @AtLeastTeacherOrSelf
    public ResponseEntity<Boolean> presentInClassroom(@Valid @RequestBody StudentClassroomDto dto) {
        return ResponseEntity.ok(classroomService.presentInClassroom(dto));
    }
}
