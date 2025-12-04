package com.spotly.backend.controller;

import com.spotly.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

// Імпорти для MockMvc (щоб писати get(), status(), jsonPath())
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest // 1. Запускає ВЕСЬ додаток (H2, Security, все-все)
@AutoConfigureMockMvc // 2. Налаштовує "штучний браузер" MockMvc
@ActiveProfiles("test")
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc; // Наш "браузер"

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        // (Опціонально) Можна очистити базу перед кожним тестом,
        // але оскільки ми використовуємо DataInitializer,
        // там вже будуть дані (3 події).
    }

    // === ТЕСТ 1: Отримати всі події (Успіх) ===
    @Test
    @WithMockUser(username = "test@example.com") // 3. МАГІЯ: Імітує, що ми залогінені!
    void shouldReturnAllEvents() throws Exception {
        
        // Робимо запит: GET /api/events
        mockMvc.perform(get("/api/events")
                        .contentType(MediaType.APPLICATION_JSON))
                
                // Перевіряємо відповідь:
                .andExpect(status().isOk()) // Статус має бути 200
                .andExpect(jsonPath("$.content").isArray()) // 'content' має бути масивом
                .andExpect(jsonPath("$.content.length()").value(3)); // Має бути 3 події (з DataInitializer)
    }

    // === ТЕСТ 2: Спроба доступу без логіну (Провал) ===
    @Test
    void shouldForbidAccessForAnonymous() throws Exception {
        
        // Робимо запит БЕЗ @WithMockUser
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isForbidden()); // Має бути 403 (або 401)
    }

    // === ТЕСТ 3: Створення події (POST) ===
    @Test
    @WithMockUser(username = "test@example.com") // Ми залогінені
    void shouldCreateNewEvent() throws Exception {
        
        String newEventJson = """
            {
                "title": "Інтеграційний Тест",
                "description": "Це працює!",
                "city": "Одеса",
                "price": 500.0,
                "address": "Вул. Дерибасівська",
                "startDateTime": "2025-12-31T23:00:00",
                "endDateTime": "2026-01-01T05:00:00",
                "categoryIds": [1]
            }
        """;

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newEventJson)) // Відправляємо JSON
                
                .andExpect(status().isCreated()) // Чекаємо 201 Created
                .andExpect(jsonPath("$.title").value("Інтеграційний Тест")) // Перевіряємо, що повернулося
                .andExpect(jsonPath("$.city").value("Одеса"));
    }
}