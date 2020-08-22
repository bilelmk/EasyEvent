package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SurveyRepository extends JpaRepository <Survey, Long> {

    @Query("SELECT s FROM Survey s WHERE s.event.event_id = :id ")
    List<Survey> findByEventId(@Param("id") Long id);
}

