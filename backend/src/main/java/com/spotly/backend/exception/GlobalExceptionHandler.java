package com.spotly.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        log.warn("Resource not found: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.NOT_FOUND, request, "Not Found");
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailExists(EmailAlreadyExistsException ex, WebRequest request) {
        log.warn("Email already exists: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.BAD_REQUEST, request, "Bad Request");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
        log.warn("Access denied: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.FORBIDDEN, request, "Forbidden");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(WebRequest request) {
        log.warn("Bad credentials attempt");
        return buildResponse(new Exception("Invalid email or password"), HttpStatus.UNAUTHORIZED, request, "Unauthorized");
    }

    @ExceptionHandler(InvalidInterestSelectionException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInterestSelection(InvalidInterestSelectionException ex, WebRequest request) {
        log.warn("Invalid interest selection: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.BAD_REQUEST, request, "Bad Request");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        log.error("Unhandled exception caught: {}", ex.getMessage(), ex);
        return buildResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request, "Internal Server Error");
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<ErrorResponse> handleFileUploadException(FileUploadException ex, WebRequest request) {
        log.warn("File upload error: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request, "File Upload Error");
    }

    @ExceptionHandler(EventIsFullException.class)
    public ResponseEntity<ErrorResponse> handleEventIsFullException(EventIsFullException ex, WebRequest request) {
        log.warn("Event is full: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.BAD_REQUEST, request, "Bad Request");
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleSpringAccessDenied(
            org.springframework.security.access.AccessDeniedException ex, WebRequest request
    ) {
        log.warn("Spring Security access denied: {}", ex.getMessage());
        return buildResponse(ex, HttpStatus.FORBIDDEN, request, "Forbidden");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Error",
                errors.toString(),
                request.getDescription(false).replace("uri=", ""),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDataException(InvalidDataException ex, WebRequest request) {
        String path = request.getDescription(false).replace("uri=", "");

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Error",
                ex.getMessage(),
                path,
                LocalDateTime.now()
        );

        log.warn("Validation failed: {}", ex.getMessage());

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ErrorResponse> buildResponse(Exception ex, HttpStatus status, WebRequest request, String errorType) {
        String path = request.getDescription(false).replace("uri=", "");
        ErrorResponse errorResponse = new ErrorResponse(
                status.value(),
                errorType,
                ex.getMessage(),
                path,
                LocalDateTime.now()
        );
        return new ResponseEntity<>(errorResponse, status);
    }
}