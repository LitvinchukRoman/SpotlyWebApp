package com.spotly.backend.controller;


import com.spotly.backend.dto.ReportDto;
import com.spotly.backend.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${frontend.url}")
@AllArgsConstructor
public class AdminController {
    private final ReportService reportService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/reports")
    public Page<ReportDto> getAllReports(Pageable pageable) {
        return reportService.getAllReports(pageable);
    }

}
