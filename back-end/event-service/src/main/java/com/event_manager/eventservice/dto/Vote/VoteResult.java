package com.event_manager.eventservice.dto.Vote;

import lombok.Data;

@Data
public class VoteResult {
    private  String name ;
    private int value ;


    public VoteResult(String name, int value) {
        this.name = name;
        this.value = value;
    }
}

