package com.event_manager.eventservice.services;

import com.event_manager.eventservice.dto.Vote.VoteDTO;
import com.event_manager.eventservice.dto.Vote.VoteResult;
import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Vote;
import com.event_manager.eventservice.models.VoteOption;
import com.event_manager.eventservice.models.VoteResponse;
import com.event_manager.eventservice.repositories.VoteReponseRepository;
import com.event_manager.eventservice.repositories.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository ;

    @Autowired
    private VoteReponseRepository voteReponseRepository ;

    @Autowired
    private MapService mapService ;

    public List<VoteDTO> findVoteByEventId(Long id) {
        List<Vote> votes = this.voteRepository.findByEventId(id) ;
        return votes.stream().map(vote -> mapService.convert(vote, VoteDTO.class)).collect(Collectors.toList());
    }

    public Vote createVote(Vote vote){
        return this.voteRepository.save(vote);
    }

    public void deleteVote(Long id){
        this.voteRepository.deleteById(id);
    }

    public Vote updateVote(Vote vote) {
        Vote v  = this.voteRepository.findById(vote.getVote_id()).orElseThrow(()->new ValidationException("vote not found"));
        v.setTitle(vote.getTitle());
        v.setDescription(vote.getDescription());
        return this.voteRepository.save(v);
    }

    public Vote addOptionToVote(Long Id , VoteOption option){
        Vote vote = voteRepository.findById(Id).orElseThrow(()->new ValidationException("Vote Day with the id %s not found" + Id));
        vote.getOptions_list().add(option);
        return  voteRepository.save(vote);
    }

    public List<Vote> findUserVotes ( Long event_id , Long user_id ) {
        List<Vote> votes = this.voteRepository.findByEventId(event_id) ;
        votes.forEach( vote -> {
            List<VoteResponse> list = vote.getResponse_list().stream().filter(surveyResponse -> surveyResponse.getUser().getUser_id().equals(user_id)).collect(Collectors.toList()); ;
            vote.setResponse_list(list) ;
        });
        return votes ;
    }

    public VoteResponse updateExistResponse(VoteResponse responseDetails) {
        VoteResponse rep = this.voteReponseRepository.findById(responseDetails.getVote_response_id()).orElseThrow(()->new ValidationException("Response not found"));
        rep.setOption(responseDetails.getOption());
        return this.voteReponseRepository.save(rep);
    }

    public Vote addResponse(VoteResponse rep , Long id) {
        Vote vote = voteRepository.findById(id).orElseThrow(()->new ValidationException("Vote with the id %s not found" + id ));
        vote.getResponse_list().add(rep);
        return  voteRepository.save(vote);
    }

    public ArrayList<VoteResult> getVoteResult(Long id){
        ArrayList<VoteResult> results = new ArrayList<VoteResult>();
        Vote vote = voteRepository.findById(id).orElseThrow(()->new ValidationException("Vote with the id %s not found" + id ));
        List<VoteOption> options = vote.getOptions_list() ;
        List<VoteResponse> responseList = vote.getResponse_list() ;
        options.forEach(
            option -> {
                VoteResult result = new VoteResult(option.getTitle() , 0) ;
                responseList.forEach(
                        response -> {
                            if(response.getOption().getOption_id().equals(option.getOption_id())){
                                result.setValue((result.getValue())+1);
                            }
                        }
                );
                results.add(result) ;
            }
        );
        return results ;
    }

}
