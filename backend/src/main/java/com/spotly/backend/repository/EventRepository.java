package com.spotly.backend.repository;

import com.spotly.backend.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE LOWER(e.description) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(e.title) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Event> findByDescriptionContainingIgnoreCase(@Param("searchText") String searchText);

    List<Event> findByCityIgnoreCase(String city);

    @Query("SELECT e FROM Event e WHERE (LOWER(e.description) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(e.title) LIKE LOWER(CONCAT('%', :searchText, '%'))) AND LOWER(e.city) = LOWER(:city)")
    List<Event> findByDescriptionContainingAndCity(@Param("searchText") String searchText, @Param("city") String city);
}