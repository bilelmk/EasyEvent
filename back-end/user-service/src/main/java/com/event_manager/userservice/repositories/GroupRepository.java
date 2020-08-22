package com.event_manager.userservice.repositories;

import com.event_manager.userservice.models.Grp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Grp, Long> {

}
