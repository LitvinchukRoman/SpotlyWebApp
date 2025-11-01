package com.spotly.backend.dto;

public record CreateUserDto(
    String email,
    String password
) {}