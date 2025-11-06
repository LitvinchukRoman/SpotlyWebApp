package com.spotly.backend.dto;

import com.spotly.backend.domain.enums.RsvpStatus;

public record RsvpRequestDto(
    RsvpStatus status
) {}