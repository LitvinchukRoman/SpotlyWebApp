package com.spotly.backend.dto;

import java.util.Set;

public record EventDto(
        Long id,
        String title,
        String description,
        String authorName,
        Long userId,
        String city,
        Double latitude,
        Double longitude,
        Set<CategoryDto> categories
) {}