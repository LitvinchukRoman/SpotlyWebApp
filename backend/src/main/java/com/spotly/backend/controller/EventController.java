package com.spotly.backend.controller;

import com.spotly.backend.domain.enums.RsvpStatus;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.dto.RsvpRequestDto;
import com.spotly.backend.service.EventService;
import com.spotly.backend.service.RsvpService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;


@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "${frontend.url}")
@AllArgsConstructor
@Slf4j
public class EventController {


    private final EventService eventService;
    private final RsvpService rsvpService;

    @GetMapping
    public Page<EventDto> getEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String city,
            Pageable pageable
    ) {
        log.info("Отримано запит на пошук подій. Search: '{}', City: '{}'", search, city);
        if (search != null && city != null) {
            return eventService.searchEventsByDescriptionAndCity(search, city, pageable);
        } else if (search != null) {
            return eventService.searchEventsByDescription(search, pageable);
        } else if (city != null) {
            return eventService.searchEventsByCity(city, pageable);
        } else {
            return eventService.getAllEvents(pageable);
        }
    }

    @GetMapping("/my-events")
    public Page<EventDto> getMyCreatedEvents(Pageable pageable) {
        return eventService.getEventsForAuthor(pageable);
    }

    @GetMapping("/recommendations")
    public Page<EventDto> getRecommendedEventsForUser(Pageable pageable) {
        return eventService.getRecommendedEvents(pageable);
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


    @GetMapping("/feed")
    public Page<EventDto> getEventFeedForUser(Pageable pageable) {
        return eventService.getEventFeed(pageable);
    }

    @PostMapping("/{id}/rsvp")
    @ResponseStatus(HttpStatus.CREATED)
    public void setEventRsvp(@PathVariable Long id, @RequestBody RsvpRequestDto rsvpDto) {
        rsvpService.setRsvp(id, rsvpDto);
    }

    @DeleteMapping("/{id}/rsvp")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEventRsvp(@PathVariable Long id) {
        rsvpService.deleteRsvp(id);
    }

    @GetMapping("/attending")
    public Page<EventDto> getAttendingEvents(Pageable pageable) {
        return eventService.getEventsForCurrentUserByStatus(RsvpStatus.GOING, pageable);
    }

    @GetMapping("/interested")
    public Page<EventDto> getInterestedEvents(Pageable pageable) {
        return eventService.getEventsForCurrentUserByStatus(RsvpStatus.INTERESTED, pageable);
    }
}