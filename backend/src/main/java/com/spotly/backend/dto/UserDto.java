package com.spotly.backend.dto;

public record UserDto(
        Long id,
        String email,
        Integer followersCount,
        Integer followingCount
) {}