package com.event_manager.eventservice.repositories;

import com.event_manager.eventservice.models.Grp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Grp, Long> {

}
