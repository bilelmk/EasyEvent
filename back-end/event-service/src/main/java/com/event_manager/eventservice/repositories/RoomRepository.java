package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.event.event_id = :id ")
    List<Room> findByEventId(@Param("id") Long id);

    @Query("SELECT r FROM Room r WHERE r.event.event_id = :event_id and ((r.user1.user_id = :user_id) or (r.user2.user_id = :user_id) or (r.user3.user_id = :user_id))")
    Room findUserRoom(@Param("event_id") Long event_id , @Param("user_id") Long user_id );
}
