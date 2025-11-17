package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import com.spotly.backend.dto.EventDto;
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

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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
    void testGetAllEvents_ShouldReturnPageOfEventDtos() {

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
        Assertions.assertEquals("Тестова Подія", resultPage.getContent().get(0).title());

        Mockito.verify(eventRepository).findAll(pageable);
    }


    @Test
    void testGetEventById_ShouldReturnEvent_WhenFound() {

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
}