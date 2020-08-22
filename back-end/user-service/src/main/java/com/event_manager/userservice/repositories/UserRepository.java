package com.event_manager.userservice.repositories;

import com.event_manager.userservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.grp.group_id = :id and ( u.first_name like %:filter% or u.last_name like %:filter% )" )
    List<User> search(@Param("id") Long id, @Param("filter") String filter, Pageable page);

    @Query("SELECT u FROM User u WHERE u.grp.group_id = :id " )
    List<User> findByGroup(@Param("id") Long id);
}