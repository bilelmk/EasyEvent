package com.event_manager.eventservice.controllers;


import com.event_manager.eventservice.dto.Vote.VoteDTO;
import com.event_manager.eventservice.dto.Vote.VoteResult;
import com.event_manager.eventservice.models.Vote;
import com.event_manager.eventservice.models.VoteOption;
import com.event_manager.eventservice.models.VoteResponse;
import com.event_manager.eventservice.services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("votes")
public class VoteController {

    @Autowired
    private  VoteService voteService ;

    @GetMapping("event/{id}")
    public List<VoteDTO> getVoteByEventId(@PathVariable Long id) {
        return voteService.findVoteByEventId(id);
    }

    @GetMapping("result/{id}")
    public List<VoteResult> getVoteResult(@PathVariable Long id) {
        return voteService.getVoteResult(id);
    }

    @GetMapping("user/{event_id}/{user_id}")
    public List<Vote> getUserVote(@PathVariable Long event_id , @PathVariable Long user_id) {
        return voteService.findUserVotes(event_id , user_id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Vote create(@RequestBody Vote vote) {
        return voteService.createVote(vote);
    }

    @PostMapping("{vote_id}")
    public Vote addOption(@PathVariable Long vote_id ,@RequestBody VoteOption option) {
        return voteService.addOptionToVote(vote_id , option);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {voteService.deleteVote(id);
    }

    @PutMapping
    public Vote edit(@RequestBody Vote v) {
        return voteService.updateVote(v);
    }

    @PutMapping("/response")
    public VoteResponse edit(@RequestBody VoteResponse rep) {
        return voteService.updateExistResponse(rep);
    }

    @PostMapping("/response/{id}")
    public Vote add(@RequestBody VoteResponse rep , @PathVariable Long id) {
        return voteService.addResponse(rep , id);
    }
}
