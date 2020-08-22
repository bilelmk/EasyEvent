package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordinateRepository extends JpaRepository<Coordinate , Long> {
}
