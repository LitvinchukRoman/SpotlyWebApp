package com.spotly.backend.dto;

public record CreateEventDto(
        String title,
        String description,
        String city,
        Double latitude,
        Double longitude
) {}