package com.brodeckyondrej.SignUp.DbEntity.Subject;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.*;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Service.SubjectService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subject")
public class SubjectController extends NamedEntityController<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto, FindByNameDto> {

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
