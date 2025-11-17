package com.spotly.backend.service;


import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.Report;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateReportDto;
import com.spotly.backend.dto.ReportDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.ReportRepository;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ReportService {

    private final UserRepository userRepository;
    private final ReportRepository reportRepository;
    private final EventRepository eventRepository;

    public ReportDto createReport(Long eventId, CreateReportDto reportDto) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event eventToReport = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if(eventToReport.getAuthor().getId().equals(currentUser.getId())){
            throw new AccessDeniedException("You cannot report your own event");
        }

        Report report = new Report();
        report.setReportingUser(currentUser);
        report.setReportedEvent(eventToReport);
        report.setReason(reportDto.reason());
        report.setCreatedAt(LocalDateTime.now());

        Report savedReport = reportRepository.save(report);

        return mapReportToDto(savedReport);

    }

    private ReportDto mapReportToDto(Report report) {
        return new ReportDto(
                report.getId(),
                report.getReason(),
                report.getCreatedAt(),
                report.getReportedEvent().getId(),
                report.getReportedEvent().getTitle(),
                report.getReportingUser().getId(),
                report.getReportingUser().getEmail()
        );

    }

}
