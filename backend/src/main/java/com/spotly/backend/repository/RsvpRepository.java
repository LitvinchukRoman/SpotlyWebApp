package com.spotly.backend.repository;

import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.EventRsvp;
import com.spotly.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RsvpRepository extends JpaRepository<EventRsvp, Long> {
    Optional<EventRsvp> findByUserAndEvent(User user, Event event);
}
