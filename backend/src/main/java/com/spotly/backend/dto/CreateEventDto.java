package com.spotly.backend.dto;

import jakarta.validation.constraints.*;

import java.util.Set;

public record CreateEventDto(
        @NotBlank(message = "Назва події обов'язкова")
        @Size(min = 3, max = 100, message = "Назва має бути від 3 до 100 символів")
        String title,

        @NotBlank(message = "Опис обов'язковий")
        @Size(max = 1000, message = "Опис занадто довгий")
        String description,

        @NotBlank(message = "Місто обов'язкове")
        String city,

        @NotNull(message = "Широта обов'язкова")
        Double latitude,

        @NotNull(message = "Довгота обов'язкова")
        Double longitude,

        @NotEmpty(message = "Подія повинна мати хоча б одну категорію")
        Set<Long> categoryIds,

        @NotBlank(message = "Адреса обов'язкова")
        String address,

        @NotNull(message = "Ціна обов'язкова")
        @Min(value = 0, message = "Ціна не може бути від'ємною")
        Double price,

        @NotBlank(message = "Час початку обов'язковий")
        String startDateTime,

        @NotBlank(message = "Час завершення обов'язковий")
        String endDateTime,

        String imageUrl,

        @Min(value = 1, message = "Ліміт учасників має бути мінімум 1")
        Integer participantLimit
) {
}