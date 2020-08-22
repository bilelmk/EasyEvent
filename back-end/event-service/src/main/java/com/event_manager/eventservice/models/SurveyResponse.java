package com.event_manager.eventservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class SurveyResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long survey_response_id ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int stars ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @ManyToOne
    @JoinColumn(name = "user_id" )
    private User user ;
}
