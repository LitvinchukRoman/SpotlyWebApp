package com.spotly.backend.controller;

import com.spotly.backend.dto.LoginRequestDto;
import com.spotly.backend.dto.LoginResponseDto;
import com.spotly.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponseDto loginUser(@RequestBody LoginRequestDto loginRequest) {
        return authService.login(loginRequest);
    }
}