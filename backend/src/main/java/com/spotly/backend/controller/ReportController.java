package com.spotly.backend.controller;


import com.spotly.backend.dto.CreateReportDto;
import com.spotly.backend.dto.ReportDto;
import com.spotly.backend.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events/{eventId}/report")
@CrossOrigin(origins = "${frontend.url}")
@AllArgsConstructor
public class ReportController {

    private final ReportService reportService;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportDto submitReport(
            @PathVariable Long eventId,
            @RequestBody CreateReportDto reportDto
            )
    {
        return reportService.createReport(eventId, reportDto);
    }
}
