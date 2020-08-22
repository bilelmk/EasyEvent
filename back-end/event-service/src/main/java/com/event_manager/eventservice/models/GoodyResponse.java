package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class GoodyResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goody_response_id ;

    @OneToOne
    @JoinColumn(name = "goody_option_id" , referencedColumnName = "goody_option_id" )
    private GoodyOption response_option ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "user_id" )
    private User user ;
}
