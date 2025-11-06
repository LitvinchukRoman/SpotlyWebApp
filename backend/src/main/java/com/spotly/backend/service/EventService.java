package com.spotly.backend.service;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CategoryDto;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.CategoryRepository;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;


    public Page<EventDto> getAllEvents(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findAll(pageable);
        return eventPage.map(this::mapEventToDto);
    }


    public EventDto getEventById(Long id) {
        Event eventFromDb = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return mapEventToDto(eventFromDb);
    }

    public EventDto createEvent(CreateEventDto createDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<Category> categories = new HashSet<>(
                categoryRepository.findAllById(createDto.categoryIds())
        );

        Event newEvent = new Event();
        newEvent.setTitle(createDto.title());
        newEvent.setDescription(createDto.description());
        newEvent.setAuthor(author);
        newEvent.setCity(createDto.city());
        newEvent.setLatitude(createDto.latitude());
        newEvent.setLongitude(createDto.longitude());
        newEvent.setCategories(categories);

        Event savedEvent = eventRepository.save(newEvent);

        return mapEventToDto(savedEvent);
    }

    public EventDto updateEvent(Long id, UpdateEventDto updateDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();


        Event eventToUpdate = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (!eventToUpdate.getAuthor().getEmail().equals(email)) {
            throw new AccessDeniedException("You are not authorized to update this event");
        }

        Set<Category> categories = new HashSet<>(
                categoryRepository.findAllById(updateDto.categoryIds())
        );

        eventToUpdate.setTitle(updateDto.title());
        eventToUpdate.setDescription(updateDto.description());
        eventToUpdate.setCity(updateDto.city());
        eventToUpdate.setLatitude(updateDto.latitude());
        eventToUpdate.setLongitude(updateDto.longitude());
        eventToUpdate.setCategories(categories);

        Event updatedEvent = eventRepository.save(eventToUpdate);

        return mapEventToDto(updatedEvent);
    }

    public Page<EventDto> searchEventsByDescription(String searchText, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByDescriptionContainingIgnoreCase(searchText, pageable);
        return eventPage.map(this::mapEventToDto);
    }

    public Page<EventDto> searchEventsByCity(String city, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByCityContainingIgnoreCase(city, pageable);
        return eventPage.map(this::mapEventToDto);
    }

    public Page<EventDto> searchEventsByDescriptionAndCity(String searchText, String city, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByDescriptionContainingAndCityContaining(searchText, city, pageable);
        return eventPage.map(this::mapEventToDto);
    }

    public void deleteEvent(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (!event.getAuthor().getEmail().equals(email)) {
            throw new AccessDeniedException("You are not authorized to delete this event");
        }
        eventRepository.delete(event);
    }

    private EventDto mapEventToDto(Event event) {
        Set<CategoryDto> categoryDtos = event.getCategories().stream()
                .map(category -> new CategoryDto(category.getId(), category.getName()))
                .collect(Collectors.toSet());

        return new EventDto(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getAuthor().getEmail(),
                event.getAuthor().getId(),
                event.getCity(),
                event.getLatitude(),
                event.getLongitude(),
                categoryDtos
        );
    }

    public Page<EventDto> getRecommendedEvents(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<Category> userInterests = user.getInterestedCategories();

        if (userInterests == null || userInterests.isEmpty()) {
            return Page.empty();
        }

        Page<Event> recommendedEventsPage = eventRepository.findDistinctByCategoriesIn(userInterests, pageable);
        return recommendedEventsPage.map(this::mapEventToDto);
    }

    public Page<EventDto> getEventFeed(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<User> followedUsers = user.getFollowing();

        if (followedUsers == null || followedUsers.isEmpty()) {
            return Page.empty();
        }

        Page<Event> eventFeedPage = eventRepository.findByAuthorIn(followedUsers, pageable);
        return eventFeedPage.map(this::mapEventToDto);
    }
}
