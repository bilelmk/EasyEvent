package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invitation_id ;


    private String status ;

    private String grp ;

    @OneToOne()
    @JoinColumn(name = "user_id" , referencedColumnName = "user_id")
    private User user;

    @OneToOne()
    @JoinColumn(name = "event_id" , referencedColumnName = "event_id")
    private Event event;

    public Invitation( String status , String group ,User user ,Event event){
        this.event = event ;
        this.user = user ;
        this.grp = group ;
        this.status = status ;
    }

    public Invitation() {}

}
