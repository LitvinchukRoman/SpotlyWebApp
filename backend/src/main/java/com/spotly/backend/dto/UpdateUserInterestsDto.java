package com.spotly.backend.dto;

import java.util.Set;

public record UpdateUserInterestsDto(
    Set<Long> categoryIds
) {}