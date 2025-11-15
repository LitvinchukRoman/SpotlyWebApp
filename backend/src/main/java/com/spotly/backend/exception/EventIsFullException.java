package com.spotly.backend.exception;

public class EventIsFullException extends RuntimeException {
    public EventIsFullException(String message) {
        super(message);
    }
}
