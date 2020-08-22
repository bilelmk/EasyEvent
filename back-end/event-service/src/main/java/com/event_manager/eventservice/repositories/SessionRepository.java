package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session , Long> {
}
