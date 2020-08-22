package com.event_manager.eventservice.controllers;


import com.event_manager.eventservice.models.VoteOption;
import com.event_manager.eventservice.services.VoteOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vote-options")
public class VoteOptionController {

    @Autowired
    private VoteOptionService voteOptionService;

    @PutMapping
    public VoteOption edit(@RequestBody VoteOption voteOption) {
        return voteOptionService.updateVoteOption(voteOption);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {voteOptionService.deleteVoteOption(id);
    }
}