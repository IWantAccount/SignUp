package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.service.subject.SubjectService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.business.dto.subject.*;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacher;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacherOrSelf;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/subject")
public class SubjectController extends NamedEntityController<Subject, SubjectCreateDto, SubjectUpdateDto, SubjectGetDetailDto, SubjectGetListDto, FindByNameDto> {

    private final SubjectService subjectService;

    public SubjectController(SubjectService service){
        super(service);
        this.subjectService = service;
    }

    @PostMapping("/add-student")
    @AtLeastTeacher
    public ResponseEntity<Void> addStudentToSubject(@Valid @RequestBody SubjectStudentDto dto){
        subjectService.addStudent(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove-student")
    @AtLeastTeacherOrSelf
    public ResponseEntity<Void> removeStudentFromSubject(@Valid @RequestBody SubjectStudentDto dto){
        subjectService.removeStudent(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-classroom")
    @AtLeastTeacher
    public ResponseEntity<Void> addClassroomToSubject(@Valid @RequestBody SubjectClassroomDto dto){
        subjectService.addClassroom(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/search")
    public ResponseEntity<Page<SubjectGetListDto>> search(@Valid @RequestBody FindByNameDto dto, Pageable pageable){
        return ResponseEntity.ok(subjectService.search(dto, pageable));
    }

    @Override
    @PostMapping
    @AtLeastTeacher
    public ResponseEntity<SubjectGetDetailDto> create(@Valid @RequestBody SubjectCreateDto dto) {
        return super.create(dto);
    }

    @Override
    @PutMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<SubjectGetDetailDto> update(@Valid @RequestBody SubjectUpdateDto dto, @PathVariable UUID id){
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
    public ResponseEntity<Boolean> presentInSubject(@Valid @RequestBody SubjectStudentDto dto) {
        return ResponseEntity.ok(subjectService.presentInSubject(dto));
    }
}
