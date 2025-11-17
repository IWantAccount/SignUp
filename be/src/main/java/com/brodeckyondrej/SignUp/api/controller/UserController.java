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

    @PostMapping("/present-in-subject")
    public ResponseEntity<Page<StudentInSubjectDto>> getStudentEnrolledInSubject(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid @RequestBody StudentSubjectSearchDto dto, Pageable pageable){
        return ResponseEntity.ok(userService.findStudentsByNameWithSubject(dto.getStudentName(), dto.getSubjectId(), pageable));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<UserGetListDto>> search(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC)
            @Valid @RequestBody UserSearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(userService.search(dto, pageable));
    }
}
