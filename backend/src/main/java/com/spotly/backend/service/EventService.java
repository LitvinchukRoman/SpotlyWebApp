package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;


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

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

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
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        return new EventDto(
                eventFromDb.getId(),
                eventFromDb.getTitle(),
                eventFromDb.getDescription(),
                eventFromDb.getAuthor().getUsername()
        );
    }


    public EventDto updateEvent(Long id, UpdateEventDto updateDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Event eventToUpdate = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (!eventToUpdate.getAuthor().getUsername().equals(username)) {
            throw new AccessDeniedException("You are not authorized to update this event");
        }

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
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        // ОНОВЛЕНО: Кидаємо наш власний виняток
        if (!event.getAuthor().getUsername().equals(username)) {
            throw new AccessDeniedException("You are not authorized to delete this event");
        }

        eventRepository.deleteById(id);
    }
}
