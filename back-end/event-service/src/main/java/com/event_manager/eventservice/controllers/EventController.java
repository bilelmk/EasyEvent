package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.models.Event;
import com.event_manager.eventservice.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping(produces = "application/json")
    public List<Event> all() {
        return this.eventService.findAllEvents();
    }


    @PostMapping(consumes = "application/json", produces = "application/json")
    public Event create(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @PutMapping
    public Event edit(@RequestBody Event ev) {
        return eventService.updateEvent(ev);
    }

    @PutMapping("image/{id}")
    public Event insertImage(@PathVariable Long id,@RequestBody MultipartFile image){
        return this.eventService.insertImage(id,image);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
