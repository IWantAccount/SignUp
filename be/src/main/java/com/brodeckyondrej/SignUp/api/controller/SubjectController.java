package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.service.subject.SubjectService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.business.dto.subject.*;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
public class SubjectController extends NamedEntityController<Subject, SubjectCreateDto, SubjectUpdateDto, SubjectGetDetailDto, SubjectGetListDto, FindByNameDto> {

    private final SubjectService subjectService;

    public SubjectController(SubjectService service){
        super(service);
        this.subjectService = service;
    }

    @PostMapping("/add-student")
    public ResponseEntity<Void> addStudentToSubject(@Valid @RequestBody SubjectStudentDto dto){
        subjectService.addStudent(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove-student")
    public ResponseEntity<Void> removeStudentFromSubject(@Valid @RequestBody SubjectStudentDto dto){
        subjectService.removeStudent(dto);
        return ResponseEntity.ok().build();
    }
}
