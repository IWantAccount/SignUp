package com.brodeckyondrej.SignUp.DbEntity.User;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.*;
import com.brodeckyondrej.SignUp.DbEntity.User.Service.UserService;
import com.brodeckyondrej.SignUp.Universal.Dto.FindByNameDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityController;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<UserGetListDto>> getBySubjectId(@PathVariable UUID id, Pageable pageable){
        //TODO možná odfiltrovat nestudenty?
        return ResponseEntity.ok(userService.findBySubjects(id, pageable));
    }

    @GetMapping("/by-classroom/{id}")
    public ResponseEntity<Page<UserGetListDto>> getByClassroomId(@PathVariable UUID id, Pageable pageable){
        //TODO možná odfiltrovat nestudenty?
        return ResponseEntity.ok(userService.findByClassroom(id, pageable));
    }
}
