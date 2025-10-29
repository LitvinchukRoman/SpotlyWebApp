package com.spotly.backend.dto;

public record UpdateEventDto(
        String title,
        String description,
        Double latitude,
        Double longitude
) {}