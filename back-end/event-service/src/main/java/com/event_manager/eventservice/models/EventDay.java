package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;


@Data
@Entity
public class EventDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long day_id ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date day ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String start_activity ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String  end_activity ;

    @ManyToOne
    @JoinColumn(name = "event_id" )
    private Event event ;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"event_day"} ,allowSetters = true)
    @JoinColumn(name="day_id" , referencedColumnName = "day_id")
    private List<Session> sessions_list ;

}
