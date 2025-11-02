package com.spotly.backend.dto;

public record EventDto(
        Long id,
        String title,
        String description,
        String authorName,
        Long userId,
        String city,
        Double latitude,
        Double longitude
) {}