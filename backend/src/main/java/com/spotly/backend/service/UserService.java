package com.spotly.backend.service;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateUserDto;
import com.spotly.backend.dto.UpdateUserInterestsDto;
import com.spotly.backend.dto.UserDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.EmailAlreadyExistsException;
import com.spotly.backend.exception.InvalidInterestSelectionException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.CategoryRepository;
import com.spotly.backend.repository.UserRepository;
import com.spotly.backend.service.aws.FileUploadService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final FileUploadService fileUploadService;


    public UserDto registerUser(CreateUserDto createDto) {

        if (userRepository.findByEmail(createDto.email()).isPresent()) {
            throw new EmailAlreadyExistsException("Email is already taken: " + createDto.email());
        }

        String hashedPassword = passwordEncoder.encode(createDto.password());

        User newUser = new User();
        newUser.setEmail(createDto.email());
        newUser.setPassword(hashedPassword);
        newUser.setFirstName(createDto.firstName());
        newUser.setLastName(createDto.lastName());

        User savedUser = userRepository.save(newUser);

        return mapUserToDto(savedUser);
    }


    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapUserToDto)
                .collect(Collectors.toList());
    }


    public void updateUserInterests(UpdateUserInterestsDto dto) {

        if (dto.categoryIds() == null || dto.categoryIds().isEmpty() || dto.categoryIds().size() > 3) {
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

    public void followUser(Long userIdToFollow) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));

        User userToFollow = userRepository.findById(userIdToFollow)
                .orElseThrow(() -> new ResourceNotFoundException("User to follow not found"));

        if (currentUser.getId().equals(userToFollow.getId())) {
            throw new AccessDeniedException("You cannot follow yourself");
        }

        currentUser.getFollowing().add(userToFollow);
        userRepository.save(currentUser);
    }

    public void unfollowUser(Long userIdToUnfollow) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));

        User userToUnfollow = userRepository.findById(userIdToUnfollow)
                .orElseThrow(() -> new ResourceNotFoundException("User to unfollow not found"));

        currentUser.getFollowing().remove(userToUnfollow);
        userRepository.save(currentUser);
    }

    private UserDto mapUserToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFollowers() != null ? user.getFollowers().size() : 0,
                user.getFollowing() != null ? user.getFollowing().size() : 0,
                user.getFirstName(),
                user.getLastName(),
                user.getAvatarUrl()
        );
    }

    public UserDto updateAvatar(MultipartFile file) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String avatarUrl = fileUploadService.uploadFile(file);

        currentUser.setAvatarUrl(avatarUrl);
        User savedUser = userRepository.save(currentUser);

        return mapUserToDto(savedUser);
    }

}