package com.spotly.backend.dto;

public record EventDto(
        Long id,
        String title,
        String description
) {}