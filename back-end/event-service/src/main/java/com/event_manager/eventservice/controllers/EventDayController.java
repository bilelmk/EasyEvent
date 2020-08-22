package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.models.EventDay;
import com.event_manager.eventservice.models.Session;
import com.event_manager.eventservice.services.EventDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("eventDays")
public class EventDayController {

    @Autowired
    private EventDayService eventDayService;


//    @GetMapping(produces = "application/json")
//    public List<EventDay> all() {
//        return this.eventDayService.findAllEventDays();
//    }
//
//    @PostMapping(consumes = "application/json", produces = "application/json")
//    public EventDay create(@RequestBody EventDay event) {
//        return eventDayService.createEventDay(event);
//    }

    @PutMapping
    public EventDay edit(@RequestBody EventDay day) {
        return eventDayService.updateEventDay(day);
    }

    @PostMapping("{id}")
    public EventDay addSession(@PathVariable Long id ,@RequestBody Session session) {
        return eventDayService.addSessionToEventDay(id ,session);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        eventDayService.deleteEventDay(id);
    }

}
