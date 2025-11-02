package com.spotly.backend.dto;

public record UpdateEventDto(
        String title,
        String description,
        String city,
        Double latitude,
        Double longitude
) {}