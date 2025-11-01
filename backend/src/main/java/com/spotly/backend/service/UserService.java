package com.spotly.backend.service;

import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.exception.EmailAlreadyExistsException;
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

        if (userRepository.findByEmail(createDto.email()).isPresent()) {
            throw new EmailAlreadyExistsException("Email is already taken: " + createDto.email());
        }

        String hashedPassword = passwordEncoder.encode(createDto.password());

        User newUser = new User();
        newUser.setEmail(createDto.email());
        newUser.setPassword(hashedPassword);

        User savedUser = userRepository.save(newUser);

        return new UserDto(savedUser.getId(), savedUser.getEmail());
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getEmail()))
                .collect(Collectors.toList());
    }
}