package com.spotly.backend.controller;

import com.spotly.backend.dto.EventDto;
import com.spotly.backend.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

import java.util.List;


@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class EventController {


    private final EventService eventService;

    @GetMapping
    public List<EventDto> getEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String city
    ) {

        if (search != null && city != null) {
            return eventService.searchEventsByDescriptionAndCity(search, city);

        } else if (search != null) {
            return eventService.searchEventsByDescription(search);

        } else if (city != null) {
            return eventService.searchEventsByCity(city);

        } else {
            return eventService.getAllEvents();
        }
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


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }


    @GetMapping("/recommendations")
    public List<EventDto> getRecommendedEventsForUser() {
        return eventService.getRecommendedEvents();
    }
}