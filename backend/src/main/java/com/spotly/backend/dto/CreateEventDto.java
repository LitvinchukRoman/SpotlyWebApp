package com.spotly.backend.dto;

public record CreateEventDto(
        String title,
        String description,
        Double latitude,
        Double longitude
) {}