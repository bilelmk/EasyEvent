package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyResponseRepository  extends JpaRepository<SurveyResponse , Long> {

}
