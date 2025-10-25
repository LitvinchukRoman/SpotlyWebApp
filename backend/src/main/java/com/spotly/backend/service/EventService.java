package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.repository.EventRepository;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventDto> getAllEvents() {

        List<Event> eventsFromDb = eventRepository.findAll();

        return eventsFromDb.stream()
                .map(event -> new EventDto(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription()
                ))
                .collect(Collectors.toList());
    }

    public EventDto createEvent(CreateEventDto createDto) {

        Event newEvent = new Event();
        newEvent.setTitle(createDto.title());
        newEvent.setDescription(createDto.description());

        Event savedEvent = eventRepository.save(newEvent);

        return new EventDto(
                savedEvent.getId(),
                savedEvent.getTitle(),
                savedEvent.getDescription()
        );
    }
}
