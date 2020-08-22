package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    @Query("SELECT i FROM Invitation i WHERE i.event.event_id = :id")
    public List<Invitation> findInvitationByEvent(@Param("id") Long id);

    @Query("SELECT i FROM Invitation i WHERE i.event.event_id = :id and  (i.status = 'accepted' or i.status = 'arrived' ) ")
    public List<Invitation> findAcceptedInvitations(@Param("id") Long id);

    @Query("SELECT i FROM Invitation i WHERE i.user.user_id = :id and status = 'invited' ")
    public List<Invitation> findInvitationsByUser(@Param("id") Long id);

    @Query("SELECT i FROM Invitation i WHERE  i.user.user_id = :id and (i.status = 'accepted' or i.status = 'arrived' ) ")
    public List<Invitation> findUserAcceptedInvitations(@Param("id") Long id);


}
