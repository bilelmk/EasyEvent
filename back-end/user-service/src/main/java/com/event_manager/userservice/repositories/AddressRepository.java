package com.event_manager.userservice.repositories;

import com.event_manager.userservice.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
