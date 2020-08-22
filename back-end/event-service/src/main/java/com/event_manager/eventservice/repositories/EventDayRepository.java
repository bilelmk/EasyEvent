package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.EventDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventDayRepository extends JpaRepository<EventDay , Long> {
}
