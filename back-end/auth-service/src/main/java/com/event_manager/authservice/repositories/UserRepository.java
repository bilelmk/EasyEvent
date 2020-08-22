package com.event_manager.authservice.repositories;

import com.event_manager.authservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String userName);
    public User save(User user) ;
}
