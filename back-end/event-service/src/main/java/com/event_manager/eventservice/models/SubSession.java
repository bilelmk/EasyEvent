package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class SubSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subsession_id ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String title ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String start_time ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String end_time ;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session ;
}
