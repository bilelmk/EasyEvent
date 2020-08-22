package com.event_manager.eventservice.dto.Vote;

import com.event_manager.eventservice.models.VoteOption;
import lombok.Data;

import java.util.List;

@Data
public class VoteDTO {

    private Long vote_id ;

    private String title ;

    private String description ;

    private List<VoteOption> options_list ;
}
