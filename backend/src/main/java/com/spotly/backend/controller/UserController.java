package com.spotly.backend.controller;

import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UpdateUserInterestsDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto registerNewUser(@RequestBody CreateUserDto createDto) {
        return userService.registerUser(createDto);
    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/me/interests")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCurrentUserInterests(@RequestBody UpdateUserInterestsDto interestsDto) {
        userService.updateUserInterests(interestsDto);
    }
}