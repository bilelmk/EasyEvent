package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long event_id;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date start_date;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date end_date;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int attendees_number;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="event_id" , referencedColumnName = "event_id")
    @JsonIgnoreProperties(value = {"event"}, allowSetters = true)
    private List<EventDay> day_list;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_coordinate" , referencedColumnName = "id_coordinate")
    private Coordinate coordinate;

    @OneToOne(fetch=FetchType.EAGER,cascade = {CascadeType.MERGE})
    private Image image;

}
