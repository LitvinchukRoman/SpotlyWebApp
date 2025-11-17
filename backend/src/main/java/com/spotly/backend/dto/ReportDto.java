package com.spotly.backend.dto;

import java.time.LocalDateTime;

public record ReportDto (
        Long id,
        String reason,
        LocalDateTime createdAt,
        Long eventId,
        String eventTitle,
        Long reporterId,
        String reporterEmail
){ }
