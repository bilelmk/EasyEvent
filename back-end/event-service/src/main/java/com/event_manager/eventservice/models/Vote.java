package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vote_id ;

    private String title ;

    private String description ;

    @ManyToOne
    @JoinColumn(name = "event_id" )
    private Event event ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="vote_id" , referencedColumnName = "vote_id")
    private List<VoteOption> options_list ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="vote_id" , referencedColumnName = "vote_id")
    private List<VoteResponse> response_list;
}
