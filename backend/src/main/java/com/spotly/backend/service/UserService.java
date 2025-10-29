package com.spotly.backend.service;

import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.exception.UsernameAlreadyExistsException;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserDto registerUser(CreateUserDto createDto) {

        if (userRepository.findByUsername(createDto.username()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username is already taken: " + createDto.username());
        }

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