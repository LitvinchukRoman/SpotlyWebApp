package com.spotly.backend.controller;

import com.spotly.backend.dto.EventDto;
import com.spotly.backend.service.EventService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

import java.util.List;


@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {


    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @GetMapping
    public List<EventDto> getAllEvents() {
        return eventService.getAllEvents();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventDto createNewEvent(@RequestBody CreateEventDto createDto) {

        return eventService.createEvent(createDto);
    }


    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable Long id) {

        return eventService.getEventById(id);
    }


    @PutMapping("/{id}")
    public EventDto updateEvent(
            @PathVariable Long id,
            @RequestBody UpdateEventDto updateDto
    ) {
        return eventService.updateEvent(id, updateDto);
    }
}