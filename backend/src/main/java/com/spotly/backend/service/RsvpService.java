package com.spotly.backend.service;

import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.EventRsvp;
import com.spotly.backend.domain.User;
import com.spotly.backend.domain.enums.RsvpStatus;
import com.spotly.backend.dto.RsvpRequestDto;
import com.spotly.backend.exception.AccessDeniedException;
import com.spotly.backend.exception.ResourceNotFoundException;
import com.spotly.backend.repository.EventRepository;
import com.spotly.backend.repository.RsvpRepository;
import com.spotly.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RsvpService {

    private final RsvpRepository rsvpRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;


    public void setRsvp(Long eventId, RsvpRequestDto rsvpDto) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getAuthor().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You cannot RSVP to your own event");
        }

        Optional<EventRsvp> existingRsvp = rsvpRepository.findByUserAndEvent(currentUser, event);

        EventRsvp rsvp;
        if (existingRsvp.isPresent()) {
            rsvp = existingRsvp.get();
        } else {
            rsvp = new EventRsvp();
            rsvp.setUser(currentUser);
            rsvp.setEvent(event);
        }

        rsvp.setStatus(rsvpDto.status());
        rsvpRepository.save(rsvp);
    }

    public void deleteRsvp(Long eventId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        EventRsvp rsvp = rsvpRepository.findByUserAndEvent(currentUser, event)
                .orElseThrow(() -> new ResourceNotFoundException("You are not RSVP'd to this event"));

        rsvpRepository.delete(rsvp);
    }


}