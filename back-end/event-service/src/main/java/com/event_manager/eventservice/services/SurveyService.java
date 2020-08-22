package com.event_manager.eventservice.services;

import com.event_manager.eventservice.dto.Survey.SurveyDTO;
import com.event_manager.eventservice.dto.Survey.SurveyResult;
import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Survey;
import com.event_manager.eventservice.models.SurveyResponse;
import com.event_manager.eventservice.repositories.SurveyRepository;
import com.event_manager.eventservice.repositories.SurveyResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private SurveyResponseRepository surveyResponseRepository ;

    @Autowired
    private MapService mapService ;

    public Survey createSurvey(Survey survey){
        return this.surveyRepository.save(survey);
    }

    public void deleteSurvey(Long id){
        this.surveyRepository.deleteById(id);
    }

    public List<SurveyDTO> findSurveyByEventId (Long id) {
        List<Survey> surveys = this.surveyRepository.findByEventId(id) ;
        return surveys.stream().map(goody -> mapService.convert(goody, SurveyDTO.class)).collect(Collectors.toList());
    }

    public Survey updateSurvey(Survey surveyDetails) {
        Survey sv = this.surveyRepository.findById(surveyDetails.getSurvey_id()).orElseThrow(()->new ValidationException("Survey not found"));
        sv.setTitle(surveyDetails.getTitle());
        sv.setDescription(surveyDetails.getDescription());
        sv.setStar_number(surveyDetails.getStar_number());
        return this.surveyRepository.save(sv);
    }

    public List<Survey> findUserSurveys ( Long event_id , Long user_id ) {
        List<Survey> surveys = this.surveyRepository.findByEventId(event_id) ;
        surveys.forEach( survey -> {
             List<SurveyResponse> list = survey.getResponse_list().stream().filter(surveyResponse -> surveyResponse.getUser().getUser_id().equals(user_id)).collect(Collectors.toList()); ;
             survey.setResponse_list(list) ;
        });
        return surveys ;
    }

    public SurveyResponse updateExistResponse(SurveyResponse responseDetails) {
        SurveyResponse rep = this.surveyResponseRepository.findById(responseDetails.getSurvey_response_id()).orElseThrow(()->new ValidationException("Response not found"));
        rep.setStars(responseDetails.getStars());
        return this.surveyResponseRepository.save(rep);
    }

    public Survey addResponse(SurveyResponse rep , Long id) {
        Survey survey = surveyRepository.findById(id).orElseThrow(()->new ValidationException("Survey with the id %s not found" + id ));
        survey.getResponse_list().add(rep);
        return  surveyRepository.save(survey);
    }

    public ArrayList<SurveyResult> getSurveyResult(Long id){
        ArrayList<SurveyResult> results = new ArrayList<SurveyResult>();
        Survey survey = surveyRepository.findById(id).orElseThrow(()->new ValidationException("Survey with the id %s not found" + id ));
        List<SurveyResponse> responseList = survey.getResponse_list() ;
        for(int i=1 ; i<=survey.getStar_number() ; i++){
            SurveyResult result = new SurveyResult(i + " starts" , 0) ;
            int finalI = i;
            responseList.forEach(
                    response -> {
                        if(response.getStars() == finalI){
                            result.setValue((result.getValue())+1);
                        }
                    }
            );
            results.add(result) ;
        }
        return results ;
    }
}
