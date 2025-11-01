package com.spotly.backend.dto;

public record LoginRequestDto(
    String email,
    String password
) {}