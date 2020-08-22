package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
