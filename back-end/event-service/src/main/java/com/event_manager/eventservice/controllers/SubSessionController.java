package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.models.SubSession;
import com.event_manager.eventservice.services.SubSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("subsessions")
public class SubSessionController {

    @Autowired
    private SubSessionService subSessionService;

    @PutMapping
    public SubSession edit(@RequestBody SubSession ss) {
        return subSessionService.updateSubSession(ss);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        subSessionService.deleteSession(id);
    }
}
