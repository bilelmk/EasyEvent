package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Goody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoodyRepository extends JpaRepository<Goody, Long> {
    
    @Query("SELECT g FROM Goody g WHERE g.event.event_id = :id ")
    List<Goody> findByEventId(@Param("id") Long id);
}
