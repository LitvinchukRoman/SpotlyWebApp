package com.spotly.backend.dto;

public record CreateUserDto(
    String email,
    String password,
    String firstName,
    String lastName
) {}