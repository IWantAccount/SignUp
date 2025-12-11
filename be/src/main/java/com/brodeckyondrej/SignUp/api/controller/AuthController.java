package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.BaseController;
import com.brodeckyondrej.SignUp.business.dto.auth.JwtResponseDto;
import com.brodeckyondrej.SignUp.business.dto.auth.LoginDto;
import com.brodeckyondrej.SignUp.business.service.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController extends BaseController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    //TODO DTOčko na login
    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> login(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(userService.verifyLogin(loginDto));
    }

}
