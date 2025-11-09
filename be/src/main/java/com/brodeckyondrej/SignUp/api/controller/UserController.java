package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.service.user.UserService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController extends NamedEntityController<User, UserCreateDto, UserUpdateDto, UserGetDetailDto, UserGetListDto, FindByNameDto> {
    private final UserService userService;

    public UserController(UserService service) {
        super(service);
        this.userService = service;
    }

    @PostMapping("/add-classroom")
    public ResponseEntity<Void> addStudentToClassroom(@Valid @RequestBody StudentClassroomDto dto){
        userService.addStudentToClassroom(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remove-classroom")
    public ResponseEntity<Void> removeStudentFromClassroom(@Valid @RequestBody StudentClassroomDto dto){
        userService.removeStudentFromClassroom(dto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-subject/{id}")
    public ResponseEntity<Page<UserGetListDto>> getBySubjectId(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @PathVariable UUID id, Pageable pageable){
        //TODO možná odfiltrovat nestudenty?
        return ResponseEntity.ok(userService.findBySubjects(id, pageable));
    }

    @GetMapping("/by-classroom/{id}")
    public ResponseEntity<Page<UserGetListDto>> getByClassroomId(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @PathVariable UUID id, Pageable pageable){
        //TODO možná odfiltrovat nestudenty?
        return ResponseEntity.ok(userService.findByClassroom(id, pageable));
    }

    @GetMapping("/classroom-search/{classroomId}")
    public ResponseEntity<Page<UserGetListDto>> getByClassroomAndName(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid FindByNameDto nameDto,@PathVariable UUID classroomId, Pageable pageable ){
        return ResponseEntity.ok(userService.findByClassroomAndName(classroomId, nameDto.getName(), pageable));
    }

    @PostMapping("/subject-search")
    public ResponseEntity<Page<UserGetListDto>> getBySubjectAndName(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid @RequestBody StudentSubjectSearchDto dto, Pageable pageable){
        return ResponseEntity.ok(userService.findBySubjectAndName(dto.getSubjectId(), dto.getStudentName(), pageable));
    }

    @GetMapping("/present-in-subject")
    public ResponseEntity<Page<StudentInSubjectDto>> getStudentEnrolledInSubject(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid StudentSubjectSearchDto dto, Pageable pageable){
        return ResponseEntity.ok(userService.findStudentsByNameWithSubject(dto.getStudentName(), dto.getSubjectId(), pageable));
    }

    @GetMapping("/by-role-name")
    public ResponseEntity<Page<UserGetListDto>> getUserByRoleAndName(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid UserRoleNameDto dto, Pageable pageable){
        return ResponseEntity.ok(userService.findByRoleAndName(dto.getName(), dto.getRole(), pageable));
    }
}
