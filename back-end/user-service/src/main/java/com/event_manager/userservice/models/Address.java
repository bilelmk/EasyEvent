package com.event_manager.userservice.models;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long address_id ;

    private String city ;

    private String street ;

    private Long postal_code ;

}