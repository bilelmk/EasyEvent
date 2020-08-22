package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Coordinate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_coordinate ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double longitude ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double latitude ;
}
