package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class GoodyFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goody_feature_id ;

    private String feature_name ;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="goody_feature_id" , referencedColumnName = "goody_feature_id")
    private List<GoodyOption> option_list ;
}
