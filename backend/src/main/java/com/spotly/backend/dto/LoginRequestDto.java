package com.spotly.backend.dto;

public record LoginRequestDto(
    String username,
    String password
) {}