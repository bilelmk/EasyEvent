package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Grp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long group_id ;

    private String name ;

    private String description  ;
}
