package com.spotly.backend.dto;

import java.util.Set;

public record EventDto(
        Long id,
        String title,
        String description,
        String organisatorName,
        String city,
        Double latitude,
        Double longitude,
        Set<CategoryDto> categories,
        String address,
        Double price,
        String startDateTime,
        String endDateTime
) {}