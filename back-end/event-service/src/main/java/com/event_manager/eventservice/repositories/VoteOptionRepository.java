package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.VoteOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteOptionRepository extends JpaRepository<VoteOption, Long> {
}
