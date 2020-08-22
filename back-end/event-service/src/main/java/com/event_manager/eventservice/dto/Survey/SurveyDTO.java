package com.event_manager.eventservice.dto.Survey;

import lombok.Data;

@Data
public class SurveyDTO {
    private Long survey_id ;

    private String title ;

    private String description ;

    private Integer star_number ;
}
