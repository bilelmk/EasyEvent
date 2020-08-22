package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id ;

    @ManyToOne
    @JoinColumn(name = "event_id" )
    private Event event ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "user1" )
    private User user1 ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "user2" )
    private User user2 ;

    @ManyToOne
    @JoinColumn(name = "user3" )
    private User user3 ;

    private String room_name  ;
}
