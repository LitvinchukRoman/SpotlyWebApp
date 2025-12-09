package com.spotly.backend.service;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.CreateEventDto;
import com.spotly.backend.dto.EventDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.repository.CategoryRepository;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void shouldReturnAllEventsWhenEventsExist() {

        User fakeAuthor = new User();
        fakeAuthor.setFirstName("Тест");
        fakeAuthor.setLastName("Тестович");

        Event fakeEvent = new Event();
        fakeEvent.setId(1L);
        fakeEvent.setTitle("Тестова Подія");
        fakeEvent.setAuthor(fakeAuthor);
        fakeEvent.setCity("Київ");
        fakeEvent.setPrice(100.0);
        fakeEvent.setAddress("Вулиця 1");


        fakeEvent.setStartDateTime(LocalDateTime.now());
        fakeEvent.setEndDateTime(LocalDateTime.now().plusHours(2));

        fakeEvent.setCategories(new HashSet<>());


        Pageable pageable = PageRequest.of(0, 10);
        Page<Event> fakePage = new PageImpl<>(List.of(fakeEvent), pageable, 1);

        Mockito.when(eventRepository.findAll(pageable)).thenReturn(fakePage);

        Page<EventDto> resultPage = eventService.getAllEvents(pageable);


        Assertions.assertNotNull(resultPage);
        Assertions.assertEquals(1, resultPage.getTotalElements());
        Assertions.assertEquals("Тестова Подія", resultPage.getContent().getFirst().title());

        Mockito.verify(eventRepository).findAll(pageable);
    }


    @Test
    void shouldReturnEventWhenGetByIdAndFound() {

        Long eventId = 1L;
        User fakeAuthor = new User();
        fakeAuthor.setFirstName("Тест");
        fakeAuthor.setLastName("Тестович");

        Event fakeEvent = new Event();
        fakeEvent.setId(eventId);
        fakeEvent.setTitle("Знайдена Подія");
        fakeEvent.setAuthor(fakeAuthor);
        fakeEvent.setCity("Київ");
        fakeEvent.setPrice(100.0);
        fakeEvent.setAddress("Вулиця 1");
        fakeEvent.setStartDateTime(LocalDateTime.now());
        fakeEvent.setEndDateTime(LocalDateTime.now().plusHours(2));
        fakeEvent.setCategories(new HashSet<>());


        Mockito.when(eventRepository.findById(eventId)).thenReturn(Optional.of(fakeEvent));

        EventDto resultDto = eventService.getEventById(eventId);

        Assertions.assertNotNull(resultDto);
        Assertions.assertEquals("Знайдена Подія", resultDto.title());
        Assertions.assertEquals(1L, resultDto.id());
    }

    @Test
    void shouldDeleteEventWhenUserIsAuthor() {
        User fakeAuthor = new User();
        fakeAuthor.setId(1L);
        fakeAuthor.setEmail("test@example.com");

        Event fakeEvent = new Event();
        fakeEvent.setId(1L);
        fakeEvent.setAuthor(fakeAuthor);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn("test@example.com");
        SecurityContextHolder.setContext(securityContext);

        Mockito.when(eventRepository.findById(1L))
                .thenReturn(Optional.of(fakeEvent));

        eventService.deleteEvent(1L);

        Mockito.verify(eventRepository, Mockito.times(1)).delete(fakeEvent);
    }

    @Test
    void shouldThrowAccessDeniedWhenUserIsNotAuthor(){
        User authorUser = new User();
        authorUser.setId(1L);
        authorUser.setEmail("author@example.com");
        authorUser.setFirstName("Автор");
        authorUser.setLastName("Події");

        User attackerUser = new User();
        attackerUser.setId(2L);
        attackerUser.setEmail("hacker@example.com");
        attackerUser.setFirstName("Злий");
        attackerUser.setLastName("Хакер");

        Event fakeEvent = new Event();
        fakeEvent.setId(10L);
        fakeEvent.setAuthor(authorUser);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn("hacker@example.com");
        SecurityContextHolder.setContext(securityContext);

        Mockito.when(eventRepository.findById(10L)).thenReturn(Optional.of(fakeEvent));

        Assertions.assertThrows(AccessDeniedException.class, () -> eventService.deleteEvent(10L));

        Mockito.verify(eventRepository, Mockito.never()).delete(fakeEvent);
    }

    @Test
    void shouldSaveAndReturnDtoWhenCreateEvent(){

        Set<Long> categoryIds = Set.of(1L, 2L);
        CreateEventDto createDto = new CreateEventDto(
                "Нова Подія",
                "Опис події",
                "Київ",
                50.0,
                30.0,
                categoryIds,
                "Вул. Хрещатик",
                0.0,
                "2025-01-01T10:00:00",
                "2025-01-01T12:00:00",
                "100",
                "http://example.com/image.jpg"
        );

        User fakeAuthor = new User();
        fakeAuthor.setId(10L);
        fakeAuthor.setEmail("author@test.com");
        fakeAuthor.setFirstName("Test");
        fakeAuthor.setLastName("User");

        Category fakeCategory = new Category();
        fakeCategory.setId(1L);
        fakeCategory.setName("Музика");

        Event savedEvent = new Event();
        savedEvent.setId(1L);
        savedEvent.setTitle(createDto.title());
        savedEvent.setAuthor(fakeAuthor);
        savedEvent.setCategories(Set.of(fakeCategory));
        savedEvent.setStartDateTime(LocalDateTime.parse(createDto.startDateTime()));
        savedEvent.setEndDateTime(LocalDateTime.parse(createDto.endDateTime()));

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn("author@test.com");
        SecurityContextHolder.setContext(securityContext);

        Mockito.when(userRepository.findByEmail("author@test.com"))
                .thenReturn(Optional.of(fakeAuthor));

        Mockito.when(categoryRepository.findAllById(categoryIds))
                .thenReturn(List.of(fakeCategory));
        Mockito.when(eventRepository.save(Mockito.any(Event.class)))
                .thenReturn(savedEvent);

        EventDto resultDto = eventService.createEvent(createDto);

        Assertions.assertNotNull(resultDto);
        Assertions.assertEquals(1L, resultDto.id());
        Assertions.assertEquals("Нова Подія", resultDto.title());
        Assertions.assertEquals("Test User", resultDto.organisatorName());

        Mockito.verify(eventRepository, Mockito.times(1)).save(Mockito.any(Event.class));
    }

    @Test
    void shouldReturnListWhenUserHasInterests(){
        Category musicCategory = new Category();
        musicCategory.setId(1L);
        musicCategory.setName("Музика");

        User currentUser = new User();
        currentUser.setEmail("fan@test.com");
        currentUser.setFirstName("Fan");
        currentUser.setLastName("User");
        currentUser.setInterestedCategories(Set.of(musicCategory));

        User author = new User();
        author.setFirstName("Author");
        author.setLastName("Name");

        Event recommendedEvent = new Event();
        recommendedEvent.setId(10L);
        recommendedEvent.setTitle("Концерт");
        recommendedEvent.setAuthor(author);
        recommendedEvent.setCategories(Set.of(musicCategory));
        recommendedEvent.setStartDateTime(LocalDateTime.now());
        recommendedEvent.setEndDateTime(LocalDateTime.now().plusHours(2));
        recommendedEvent.setAddress("Test Address");
        recommendedEvent.setPrice(50.0);

        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        Mockito.when(securityContext.getAuthentication()).thenReturn(authentication);
        Mockito.when(authentication.getName()).thenReturn("fan@test.com");
        SecurityContextHolder.setContext(securityContext);

        Mockito.when(userRepository.findByEmail("fan@test.com"))
                .thenReturn(Optional.of(currentUser));

        Mockito.when(eventRepository.findDistinctByCategoriesIn(currentUser.getInterestedCategories(), Pageable.ofSize(10)))
                .thenReturn(new PageImpl<>(List.of(recommendedEvent)));

        Page<EventDto> resultPage = eventService.getRecommendedEvents(Pageable.ofSize(10));

        Assertions.assertNotNull(resultPage);
        Assertions.assertEquals(1, resultPage.getTotalElements());
        Assertions.assertEquals("Концерт", resultPage.getContent().getFirst().title());

        Mockito.verify(eventRepository, Mockito.times(1))
                .findDistinctByCategoriesIn(currentUser.getInterestedCategories(), Pageable.ofSize(10));

    }



}