package com.spotly.backend.service;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UpdateUserInterestsDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.exception.EmailAlreadyExistsException;
import com.spotly.backend.exception.InvalidInterestSelectionException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.CategoryRepository;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;


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


    public void updateUserInterests(UpdateUserInterestsDto dto) {

        if (dto.categoryIds() == null || dto.categoryIds().size() < 1 || dto.categoryIds().size() > 3) {
            throw new InvalidInterestSelectionException("You must select between 1 and 3 interests.");
        }

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<Category> interests = new HashSet<>(
                categoryRepository.findAllById(dto.categoryIds())
        );

        if (interests.size() != dto.categoryIds().size()) {
            throw new ResourceNotFoundException("One or more selected categories do not exist.");
        }

        user.setInterestedCategories(interests);
        userRepository.save(user);
    }
}