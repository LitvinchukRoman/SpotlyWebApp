package com.spotly.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db-version")
    public String getDatabaseVersion() {
        // Виконуємо запит до PostgreSQL
        String version = jdbcTemplate.queryForObject("SELECT version()", String.class);
        return "Database version: " + version;
    }
}
