package com.spotly.backend.service;

import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto registerUser(CreateUserDto createDto) {

        // TODO: Додати перевірку, чи юзер з таким 'username' вже існує

        String hashedPassword = passwordEncoder.encode(createDto.password());

        User newUser = new User();
        newUser.setUsername(createDto.username());
        newUser.setPassword(hashedPassword);

        User savedUser = userRepository.save(newUser);

        return new UserDto(savedUser.getId(), savedUser.getUsername());
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }
}