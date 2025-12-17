package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.service.user.UserService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.business.dto.user.*;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastAdmin;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastAdminOrSelf;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacher;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacherOrSelf;
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

    /**
     * Adds student to given classroom. If student is already present, nothing happens.
     * @throws MissingObjectException if student or classroom is not found.
     * */
    @PostMapping("/add-classroom")
    @AtLeastTeacher
    public ResponseEntity<Void> addStudentToClassroom(@Valid @RequestBody StudentClassroomDto dto){
        userService.addStudentToClassroom(dto);
        return ResponseEntity.noContent().build();
    }

    /**
     * Removes student from given classroom. If student is not present, nothing happens.
     * @throws MissingObjectException if student or classroom is not found.
     * */
    @PostMapping("/remove-classroom")
    @AtLeastTeacherOrSelf
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

    @Override
    @PostMapping
    @AtLeastAdmin
    public ResponseEntity<UserGetDetailDto> create(@Valid @RequestBody UserCreateDto dto) {
        return super.create(dto);
    }

    @Override
    @PutMapping("/{id}")
    @AtLeastAdmin
    public ResponseEntity<UserGetDetailDto> update(@Valid @RequestBody UserUpdateDto dto, @PathVariable UUID id) {
        return super.update(dto, id);
    }

    @Override
    @DeleteMapping("/{id}")
    @AtLeastAdmin
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return super.delete(id);
    }

    /**
     * Changes password of given user. Can be called only by admin or given user.
     * */
    @PostMapping("/change-password/{id}")
    @AtLeastAdminOrSelf
    public ResponseEntity<Void> updatePassword(@PathVariable UUID id, @Valid @RequestBody ChangePasswordDto dto) {
        return ResponseEntity.ok(userService.changePassword(id, dto));
    }
}
