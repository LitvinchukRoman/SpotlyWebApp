package com.spotly.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "categories")
    private Set<Event> events = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "interestedCategories")
    private Set<User> interestedUsers = new HashSet<>();
}