package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

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


    public EventDto getEventById(Long id) {

        Event eventFromDb = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

        return new EventDto(
                eventFromDb.getId(),
                eventFromDb.getTitle(),
                eventFromDb.getDescription()
        );
    }


    public EventDto updateEvent(Long id, UpdateEventDto updateDto) {
        Event eventToUpdate = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

        eventToUpdate.setTitle(updateDto.title());
        eventToUpdate.setDescription(updateDto.description());

        Event updatedEvent = eventRepository.save(eventToUpdate);

        return new EventDto(
                updatedEvent.getId(),
                updatedEvent.getTitle(),
                updatedEvent.getDescription()
        );
    }
}
