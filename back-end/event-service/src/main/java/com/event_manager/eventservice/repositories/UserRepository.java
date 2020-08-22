package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

