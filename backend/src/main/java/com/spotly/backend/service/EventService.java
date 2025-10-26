package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public List<EventDto> getAllEvents() {
        List<Event> eventsFromDb = eventRepository.findAll();

        return eventsFromDb.stream()
                .map(event -> new EventDto(
                        event.getId(),
                        event.getTitle(),
                        event.getDescription(),
                        event.getAuthor().getUsername()
                ))
                .collect(Collectors.toList());
    }

    public EventDto createEvent(CreateEventDto createDto) {
        // TODO: Виправити це, коли буде логін

        User author = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Test User not found"));

        Event newEvent = new Event();
        newEvent.setTitle(createDto.title());
        newEvent.setDescription(createDto.description());
        newEvent.setAuthor(author);

        Event savedEvent = eventRepository.save(newEvent);

        return new EventDto(
                savedEvent.getId(),
                savedEvent.getTitle(),
                savedEvent.getDescription(),
                savedEvent.getAuthor().getUsername()
        );
    }


    public EventDto getEventById(Long id) {
        Event eventFromDb = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

        return new EventDto(
                eventFromDb.getId(),
                eventFromDb.getTitle(),
                eventFromDb.getDescription(),
                eventFromDb.getAuthor().getUsername()
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
                updatedEvent.getDescription(),
                updatedEvent.getAuthor().getUsername()
        );
    }


    public void deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event not found with id: " + id);
        }

        eventRepository.deleteById(id);
    }
}
