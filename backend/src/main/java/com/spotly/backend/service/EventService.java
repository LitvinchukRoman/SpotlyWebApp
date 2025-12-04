package com.spotly.backend.service;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.domain.enums.RsvpStatus;
import com.spotly.backend.dto.CategoryDto;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.exception.InvalidDataException;
import com.spotly.backend.repository.CategoryRepository;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.UpdateEventDto;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;


    public Page<EventDto> getAllEvents(Pageable pageable) {
        Page<Event> eventPage = eventRepository.findAll(pageable);
        log.info("Знайдено {} подій на сторінці {}",
                eventPage.getNumberOfElements(), pageable.getPageNumber());
        return eventPage.map(this::mapEventToDto);
    }


    public EventDto getEventById(Long id) {
        Event eventFromDb = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return mapEventToDto(eventFromDb);
    }

    public EventDto createEvent(CreateEventDto createDto) {
        log.info("Створення події: Title='{}', City='{}'", createDto.title(), createDto.city());
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<Category> categories = new HashSet<>(
                categoryRepository.findAllById(createDto.categoryIds())
        );
        log.debug("Знайдено {} категорій для події", categories.size());

        Event newEvent = new Event();
        newEvent.setTitle(createDto.title());
        newEvent.setDescription(createDto.description());
        newEvent.setAuthor(author);
        newEvent.setCity(createDto.city());
        newEvent.setLatitude(createDto.latitude());
        newEvent.setLongitude(createDto.longitude());
        newEvent.setCategories(categories);
        newEvent.setAddress(createDto.address());
        newEvent.setPrice(createDto.price());
        newEvent.setParticipantLimit(createDto.participantLimit());
        newEvent.setImageUrl(createDto.imageUrl());

        try {
            newEvent.setStartDateTime(LocalDateTime.parse(createDto.startDateTime()));
            newEvent.setEndDateTime(LocalDateTime.parse(createDto.endDateTime()));
        } catch (DateTimeParseException e) {
            throw new InvalidDataException("Invalid date format. Use ISO format, e.g., '2025-10-26T19:00:00'");
        }

        Event savedEvent = eventRepository.save(newEvent);
        log.info("Подію успішно створено. ID: {}, Author: {}", savedEvent.getId(), email);

        return mapEventToDto(savedEvent);
    }

    public EventDto updateEvent(Long id, UpdateEventDto updateDto) {
        log.info("Запит на оновлення події ID: {}", id);
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
        eventToUpdate.setAddress(updateDto.address());
        eventToUpdate.setPrice(updateDto.price());
        eventToUpdate.setParticipantLimit(updateDto.participantLimit());
        eventToUpdate.setImageUrl(updateDto.imageUrl());
        try {
            eventToUpdate.setStartDateTime(LocalDateTime.parse(updateDto.startDateTime()));
            eventToUpdate.setEndDateTime(LocalDateTime.parse(updateDto.endDateTime()));
        } catch (DateTimeParseException e) {
            throw new InvalidDataException("Invalid date format.");
        }

        Event updatedEvent = eventRepository.save(eventToUpdate);

        log.info("Подію ID: {} успішно оновлено", updatedEvent.getId());

        return mapEventToDto(updatedEvent);
    }

    public Page<EventDto> searchEventsByDescription(String searchText, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByDescriptionContainingIgnoreCase(searchText, pageable);
        log.info("Пошук за описом '{}': знайдено {}", searchText, eventPage.getTotalElements());
        return eventPage.map(this::mapEventToDto);
    }

    public Page<EventDto> searchEventsByCity(String city, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByCityContainingIgnoreCase(city, pageable);
        log.info("Пошук за містом '{}': знайдено {}", city, eventPage.getTotalElements());
        return eventPage.map(this::mapEventToDto);
    }

    public Page<EventDto> searchEventsByDescriptionAndCity(String searchText, String city, Pageable pageable) {
        Page<Event> eventPage = eventRepository.findByDescriptionContainingAndCityContaining(searchText, city, pageable);
        log.info("Пошук за описом '{}', містом '{}': знайдено {}", searchText, city, eventPage.getTotalElements());
        return eventPage.map(this::mapEventToDto);
    }

    public Page<EventDto> getEventsForAuthor(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Set<User> authorSet = Set.of(currentUser);
        Page<Event> eventPage = eventRepository.findByAuthorIn(authorSet, pageable);
        log.info("Події автора '{}': знайдено {}", email, eventPage.getTotalElements());
        return eventPage.map(this::mapEventToDto);
    }

    public void deleteEvent(Long id) {
        log.info("Запит на видалення івенту з id={}", id);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        if (!event.getAuthor().getEmail().equals(email)) {
            throw new AccessDeniedException("You are not authorized to delete this event");
        }
        log.info("Подію ID: {} ('{}') успішно видалено автором", id, event.getTitle());
        eventRepository.delete(event);
    }

    public void deleteEventAsAdmin(Long id) {
        log.info("АДМІН-запит на видалення події ID: {}", id);
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        log.info("Подію ID: {} успішно видалено Адміном", id);
        eventRepository.delete(event);

    }


    public Page<EventDto> getRecommendedEvents(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        log.debug("Запит рекомендованих подій для користувача '{}'", email);
        Set<Category> userInterests = user.getInterestedCategories();

        if (userInterests == null || userInterests.isEmpty()) {
            return Page.empty();
        }

        Page<Event> recommendedEventsPage = eventRepository.findDistinctByCategoriesIn(userInterests, pageable);
        log.info("Список рекомендованих подій для користувача {} успішно знайдено", email);
        return recommendedEventsPage.map(this::mapEventToDto);
    }

    public Page<EventDto> getEventFeed(Pageable pageable) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        log.debug("Запит подій від користувачів, на яких підписаний {}", email);
        Set<User> followedUsers = user.getFollowing();

        if (followedUsers == null || followedUsers.isEmpty()) {
            return Page.empty();
        }

        Page<Event> eventFeedPage = eventRepository.findByAuthorIn(followedUsers, pageable);
        log.info("Список подій користувачів" +
                " на яких підписаний користувач {} успішно знайдено", email);
        return eventFeedPage.map(this::mapEventToDto);
    }


    public Page<EventDto> getEventsForCurrentUserByStatus(RsvpStatus status, Pageable pageable) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        log.debug("Запит на події за статусом {} для користувача {}",status, email);
        Page<Event> eventPage = eventRepository.findEventsByUserAndRsvpStatus(
                currentUser,
                status,
                pageable
        );
        log.info("Події для користувача {} за статусом {} успішно знайдено", email, status);
        return eventPage.map(this::mapEventToDto);
    }

    private EventDto mapEventToDto(Event event) {
        Set<CategoryDto> categoryDtos = event.getCategories().stream()
                .map(category -> new CategoryDto(category.getId(), category.getName()))
                .collect(Collectors.toSet());

        return new EventDto(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getAuthor().getFullName(),
                event.getCity(),
                event.getLatitude(),
                event.getLongitude(),
                categoryDtos,
                event.getAddress(),
                event.getPrice(),
                event.getStartDateTime().toString(),
                event.getEndDateTime().toString(),
                event.getParticipantLimit(),
                event.getImageUrl()
        );
    }
}
