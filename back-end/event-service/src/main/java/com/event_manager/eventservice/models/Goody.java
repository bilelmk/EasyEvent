package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Goody {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goody_id ;

    private String name ;

    @ManyToOne
    @JoinColumn(name = "event_id" )
    private Event event ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="goody_id" , referencedColumnName = "goody_id")
    private List<GoodyFeature> feature_list ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="goody_id" , referencedColumnName = "goody_id")
    private List<GoodyResponse> response_list ;

}
