package com.event_manager.eventservice.dto.Goody;

import com.event_manager.eventservice.models.GoodyFeature;
import lombok.Data;

import java.util.List;

@Data
public class GoodyDTO {

    private Long goody_id ;

    private String name ;

    private List<GoodyFeature> feature_list ;
}
