package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.VoteResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteReponseRepository extends JpaRepository<VoteResponse, Long> {
}
