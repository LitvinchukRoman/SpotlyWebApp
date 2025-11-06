package com.spotly.backend.repository;

import com.spotly.backend.domain.EventRsvp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RsvpRepository extends JpaRepository<EventRsvp, Long> {
    Optional<EventRsvp> findByUserAndEvent(Long event, Long user);
}
