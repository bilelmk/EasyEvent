package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT s FROM Vote s WHERE s.event.event_id = :id ")
    List<Vote> findByEventId(@Param("id") Long id);
}
