package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.SubSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubSessionRepository extends JpaRepository <SubSession , Long> {
}
