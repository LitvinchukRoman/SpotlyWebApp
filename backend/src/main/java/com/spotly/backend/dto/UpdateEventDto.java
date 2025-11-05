package com.spotly.backend.dto;

import java.util.Set;

public record UpdateEventDto(
        String title,
        String description,
        String city,
        Double latitude,
        Double longitude,
        Set<Long> categoryIds
) {}