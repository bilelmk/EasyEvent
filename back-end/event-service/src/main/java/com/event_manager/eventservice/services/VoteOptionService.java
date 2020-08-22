package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.VoteOption;
import com.event_manager.eventservice.repositories.VoteOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteOptionService {

    @Autowired
    private VoteOptionRepository voteOptionRepository;

    public void deleteVoteOption(Long id){
        this.voteOptionRepository.deleteById(id);
    }

    public VoteOption updateVoteOption(VoteOption voteOptionDetails) {
        VoteOption voteOption =this.voteOptionRepository.findById(voteOptionDetails.getOption_id()).orElseThrow(()->new ValidationException("Vote Option not found"));
        voteOption.setTitle(voteOptionDetails.getTitle());
        voteOption.setDescription(voteOptionDetails.getDescription());
        return this.voteOptionRepository.save(voteOption);
    }
}