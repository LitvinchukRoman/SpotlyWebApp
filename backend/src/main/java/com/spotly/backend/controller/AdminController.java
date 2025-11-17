package com.spotly.backend.controller;


import com.spotly.backend.dto.ReportDto;
import com.spotly.backend.service.EventService;
import com.spotly.backend.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${frontend.url}")
@AllArgsConstructor
public class AdminController {
    private final ReportService reportService;
    private final EventService eventService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/reports")
    public Page<ReportDto> getAllReports(Pageable pageable) {
        return reportService.getAllReports(pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnyEvent(@PathVariable Long id) {
        eventService.deleteEventAsAdmin(id);
    }


}
