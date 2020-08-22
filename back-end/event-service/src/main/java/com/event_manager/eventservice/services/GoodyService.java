package com.event_manager.eventservice.services;

import com.event_manager.eventservice.dto.Goody.GoodyDTO;
import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Goody;
import com.event_manager.eventservice.models.GoodyResponse;
import com.event_manager.eventservice.repositories.GoodyFeatureRepository;
import com.event_manager.eventservice.repositories.GoodyOptionRepository;
import com.event_manager.eventservice.repositories.GoodyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoodyService {


    @Autowired
    private GoodyRepository goodyRepository ;

    @Autowired
    private MapService mapService ;

    @Autowired
    private GoodyFeatureRepository goodyFeatureRepository ;

    @Autowired
    private GoodyOptionRepository goodyOptionRepository ;



    public List<GoodyDTO> findAllGoodies(Long id){
        List<Goody> goodies = this.goodyRepository.findByEventId(id) ;
        return goodies.stream().map(goody -> mapService.convert(goody, GoodyDTO.class)).collect(Collectors.toList());
    }

    public Goody createGoody(Goody goody){
        return this.goodyRepository.save(goody);
    }

    public void deleteGoody(Long id){
        this.goodyRepository.deleteById(id);
    }

    public Goody updateGoody(Goody goodyDetails) {
        Goody goody =this.goodyRepository.findById(goodyDetails.getGoody_id()).orElseThrow(()->new ValidationException("Goody not found"));
        goody.setName(goodyDetails.getName());
        return this.goodyRepository.save(goody);
    }

    public void deleteGoodyOption (Long id){
        this.goodyOptionRepository.deleteById(id);
    }

    public void deleteGoodyFeature (Long id){
        this.goodyFeatureRepository.deleteById(id);
    }


    public List<Goody> findUserGoodies ( Long event_id , Long user_id ) {
        List<Goody> votes = this.goodyRepository.findByEventId(event_id) ;
        votes.forEach( goody -> {
            List<GoodyResponse> list = goody.getResponse_list().stream().filter(surveyResponse -> surveyResponse.getUser().getUser_id().equals(user_id)).collect(Collectors.toList()); ;
            goody.setResponse_list(list) ;
        });
        return votes ;
    }

//    public GoodyResponse updateExistResponse(GoodyResponse responseDetails) {
//        GoodyResponse rep = this.voteReponseRepository.findById(responseDetails.getVote_response_id()).orElseThrow(()->new ValidationException("Response not found"));
//        rep.setOption(responseDetails.getOption());
//        return this.voteReponseRepository.save(rep);
//    }

    public Goody addResponse(GoodyResponse rep , Long id) {
        Goody goody = goodyRepository.findById(id).orElseThrow(()->new ValidationException("Goody with the id %s not found" + id ));
        goody.getResponse_list().add(rep);
        return  goodyRepository.save(goody);
    }

    public  List<GoodyResponse>  getGoodiesResult(Long id){
//        ArrayList<VoteResult> results = new ArrayList<VoteResult>();
        Goody goody = goodyRepository.findById(id).orElseThrow(()->new ValidationException("goody with the id %s not found" + id ));
//        List<VoteOption> options = vote.getOptions_list() ;
        List<GoodyResponse> responseList = goody.getResponse_list() ;

//        options.forEach(
//                option -> {
//                    VoteResult result = new VoteResult(option.getTitle() , 0) ;
//                    responseList.forEach(
//                            response -> {
//                                if(response.getOption().getOption_id().equals(option.getOption_id())){
//                                    result.setValue((result.getValue())+1);
//                                }
//                            }
//                    );
//                    results.add(result) ;
//                }
//        );
        return responseList ;
    }
}
