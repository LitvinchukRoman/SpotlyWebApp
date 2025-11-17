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

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CategoryRepository categoryRepository;

    // 3. Створюємо "Пацієнта"
    //    @InjectMocks каже: "Створи справжній 'EventService'
    //    і "впровадь" у нього всі 'імітатори' (@Mock) вище".
    @InjectMocks
    private EventService eventService;

    // 4. @Test - позначає, що це - тестовий метод
    @Test
    void testGetAllEvents_ShouldReturnPageOfEventDtos() {
        // --- A. ARRANGE (Підготовка) ---

        // 1. Створюємо "фальшиві" дані
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

        // === ВАЖЛИВЕ ВИПРАВЛЕННЯ ===
        // (Ми забули їх додати, що і спричинило NPE)
        fakeEvent.setStartDateTime(LocalDateTime.now());
        fakeEvent.setEndDateTime(LocalDateTime.now().plusHours(2));

        // (Цей код потрібен, щоб 'getCategories()' не повернув null)
        fakeEvent.setCategories(new HashSet<>());

        // 2. Створюємо "фальшиву" відповідь від бази
        Pageable pageable = PageRequest.of(0, 10);
        Page<Event> fakePage = new PageImpl<>(List.of(fakeEvent), pageable, 1);

        // 3. "Навчаємо" Імітатора:
        //    "КОЛИ (when) хтось викличе 'eventRepository.findAll(pageable)',
        //     ТОДІ (then) ПОВЕРНИ (Return) 'fakePage'".
        Mockito.when(eventRepository.findAll(pageable)).thenReturn(fakePage);

        // --- B. ACT (Дія) ---

        // 4. Викликаємо справжній метод "пацієнта"
        Page<EventDto> resultPage = eventService.getAllEvents(pageable);

        // --- C. ASSERT (Перевірка) ---

        // 5. Перевіряємо, чи "пацієнт" спрацював правильно
        Assertions.assertNotNull(resultPage); // Чи результат не 'null'?
        Assertions.assertEquals(1, resultPage.getTotalElements()); // Чи там 1 елемент?
        Assertions.assertEquals("Тестова Подія", resultPage.getContent().get(0).title()); // Чи назва правильна?

        // 6. (Бонус) Перевіряємо, чи "пацієнт"
        //    взагалі "смикнув" нашого "імітатора"
        Mockito.verify(eventRepository).findAll(pageable);
    }

    //
    // Тут ми можемо додати @Test для 'getEventById'
    // @Test для 'deleteEvent' (перевірка логіки "чи ти автор?")
    //
}