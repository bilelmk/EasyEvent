package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.dto.Goody.GoodyDTO;
import com.event_manager.eventservice.models.Goody;
import com.event_manager.eventservice.models.GoodyResponse;
import com.event_manager.eventservice.services.GoodyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("goodies")
public class GoodyController {

    @Autowired
    private GoodyService goodyService;

    @GetMapping("event/{id}")
    public List<GoodyDTO> all(@PathVariable Long id) {
        return this.goodyService.findAllGoodies(id);
    }

    @GetMapping("user/{event_id}/{user_id}")
    public List<Goody> getUserGoody(@PathVariable Long event_id , @PathVariable Long user_id) {
        return goodyService.findUserGoodies(event_id , user_id);
    }

    @GetMapping("result/{goody_id}")
    public List<GoodyResponse> getGoodyResult(@PathVariable Long goody_id ) {
         return  goodyService.getGoodiesResult(goody_id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Goody create(@RequestBody Goody goody) {
        return goodyService.createGoody(goody);
    }

    @PostMapping("/response/{id}")
    public Goody add(@RequestBody GoodyResponse rep , @PathVariable Long id) {
        return goodyService.addResponse(rep , id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        goodyService.deleteGoody(id);
    }

    @DeleteMapping("/feature/{id}")
    public void deleteFeature(@PathVariable Long id) {
        goodyService.deleteGoodyFeature(id);
    }

    @DeleteMapping("/option/{id}")
    public void deleteOption(@PathVariable Long id) {
        goodyService.deleteGoodyOption(id);
    }


}
