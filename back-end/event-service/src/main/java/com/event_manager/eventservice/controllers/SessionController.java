package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.models.Session;
import com.event_manager.eventservice.models.SubSession;
import com.event_manager.eventservice.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService ;

    @PutMapping
    public Session edit(@RequestBody Session s) {
        return sessionService.updateSession(s);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }

    @PostMapping("{id}")
    public Session addSubSession(@PathVariable Long id ,@RequestBody SubSession subSession) {
        return sessionService.addSubSessionToSession(id ,subSession);
    }
}
