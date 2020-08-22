package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.dto.Survey.SurveyDTO;
import com.event_manager.eventservice.dto.Survey.SurveyResult;
import com.event_manager.eventservice.models.Survey;
import com.event_manager.eventservice.models.SurveyResponse;
import com.event_manager.eventservice.services.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("surveys")
public class SurveyController {


    @Autowired
    private SurveyService surveyService;

    @GetMapping ("event/{id}")
    public List<SurveyDTO> getSurveyByEventId(@PathVariable Long id) {
        return surveyService.findSurveyByEventId(id);
    }

    @GetMapping ("result/{id}")
    public List<SurveyResult> getSurveyResult(@PathVariable Long id) {
        return surveyService.getSurveyResult(id);
    }

    @GetMapping ("user/{event_id}/{user_id}")
    public List<Survey> getUserSurvey(@PathVariable Long event_id , @PathVariable Long user_id) {
        return surveyService.findUserSurveys(event_id , user_id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Survey create(@RequestBody Survey survey) { return surveyService.createSurvey(survey) ; }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
    }

    @PutMapping
    public Survey edit(@RequestBody Survey sv) {
        return surveyService.updateSurvey(sv);
    }

    @PutMapping("/response")
    public SurveyResponse edit(@RequestBody SurveyResponse rep) {
        return surveyService.updateExistResponse(rep);
    }

    @PostMapping("/response/{id}")
    public Survey add(@RequestBody SurveyResponse rep , @PathVariable Long id) {
        return surveyService.addResponse(rep , id);
    }

}
