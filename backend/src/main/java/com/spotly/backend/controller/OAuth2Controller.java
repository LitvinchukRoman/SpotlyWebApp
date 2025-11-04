package com.spotly.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/oauth2")
@CrossOrigin(origins = "http://localhost:3000")
public class OAuth2Controller {

    /**
     * Повертає URLs для ініціалізації OAuth2 потоку
     * Фронтенд може використовувати ці URLs для перенаправлення користувача
     */
    @GetMapping("/urls")
    public Map<String, String> getOAuth2Urls() {
        Map<String, String> urls = new HashMap<>();
        String baseUrl = "http://localhost:8080";
        
        urls.put("google", baseUrl + "/api/auth/oauth2/authorization/google");
        urls.put("facebook", baseUrl + "/api/auth/oauth2/authorization/facebook");
        urls.put("apple", baseUrl + "/api/auth/oauth2/authorization/apple");
        
        return urls;
    }
}



