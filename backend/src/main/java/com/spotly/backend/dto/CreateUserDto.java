package com.spotly.backend.dto;

public record CreateUserDto(
    String username,
    String password
) {}