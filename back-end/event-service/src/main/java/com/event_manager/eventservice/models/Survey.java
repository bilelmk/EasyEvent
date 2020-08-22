package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long survey_id ;

    private String title ;

    private String description ;

    private Integer star_number ;

    @ManyToOne
    @JoinColumn(name = "event_id" )
    private Event event ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="survey_id" , referencedColumnName = "survey_id")
    private List<SurveyResponse> response_list;
}
