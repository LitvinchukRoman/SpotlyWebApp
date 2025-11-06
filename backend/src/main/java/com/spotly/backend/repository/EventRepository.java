package com.spotly.backend.repository;

import com.spotly.backend.domain.Category;
import com.spotly.backend.domain.Event;
import com.spotly.backend.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {


    @Query("SELECT e FROM Event e WHERE LOWER(e.description) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(e.title) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    Page<Event> findByDescriptionContainingIgnoreCase(@Param("searchText") String searchText, Pageable pageable);


    Page<Event> findByCityContainingIgnoreCase(String city, Pageable pageable);


    @Query("SELECT e FROM Event e WHERE " +
            "(LOWER(e.description) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(e.title) LIKE LOWER(CONCAT('%', :searchText, '%'))) " +
            "AND (LOWER(e.city) LIKE LOWER(CONCAT('%', :city, '%')))")
    Page<Event> findByDescriptionContainingAndCityContaining(@Param("searchText") String searchText, @Param("city") String city, Pageable pageable);


    Page<Event> findDistinctByCategoriesIn(Set<Category> categories, Pageable pageable);

    Page<Event> findByAuthorIn(Set<User> authors, Pageable pageable);
}