package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long session_id ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String title ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String start_time ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String end_time ;


    @ManyToOne
    @JoinColumn(name = "day_id")
    private EventDay event_day ;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="session_id" , referencedColumnName = "session_id")
    @JsonIgnoreProperties(value = {"session"} ,allowSetters = true)
    private List<SubSession> subSessions_list ;
}
