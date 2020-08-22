package com.event_manager.eventservice.dto.Survey;

import lombok.Data;

@Data
public class SurveyResult {

    private  String name ;
    private int value ;

    public SurveyResult(String name, int value) {
        this.name = name;
        this.value = value;
    }
}
