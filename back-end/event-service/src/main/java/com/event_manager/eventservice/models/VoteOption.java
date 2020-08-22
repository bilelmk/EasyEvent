package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class VoteOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long option_id ;

    private String title ;

    private String description ;
}
