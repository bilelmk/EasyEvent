package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class GoodyOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goody_option_id ;

    private String option_name ;
}
