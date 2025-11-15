package com.spotly.backend.controller;

import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UpdateUserInterestsDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/{userId}/follow")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void followUser(@PathVariable Long userId) {
        userService.followUser(userId);
    }

    @DeleteMapping("/{userId}/follow")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unfollowUser(@PathVariable Long userId) {
        userService.unfollowUser(userId);
    }

    @PostMapping(value = "/me/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserDto uploadAvatar(
            @RequestParam("file") MultipartFile file
    ) {
        return userService.updateAvatar(file);
    }

}