package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class VoteResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vote_response_id ;

    @OneToOne
    @JoinColumn(name = "option_id" , referencedColumnName = "option_id")
    private VoteOption option ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "user_id" )
    private User user ;

}

