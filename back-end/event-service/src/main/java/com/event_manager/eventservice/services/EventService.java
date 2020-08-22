package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Event;
import com.event_manager.eventservice.models.Image;
import com.event_manager.eventservice.models.Invitation;
import com.event_manager.eventservice.models.User;
import com.event_manager.eventservice.repositories.EventRepository;
import com.event_manager.eventservice.repositories.InvitationRepository;
import com.event_manager.eventservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository ;

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private InvitationRepository invitationRepository ;

    public List<Event> findAllEvents(){
        return this.eventRepository.findAll();
    }

    public Event createEvent(Event event){
        Event ev = this.eventRepository.save(event);
        List<User> users = this.userRepository.findAll() ;
        users.forEach(user -> {
            Invitation invitation = new Invitation( "not invited" , null , user ,ev ) ;
            this.invitationRepository.save(invitation) ;
        });
        return ev ;
    }

    public void deleteEvent(Long id){
        this.eventRepository.deleteById(id);
    }

    public Event updateEvent(Event eventDetails) {
        Event ev = this.eventRepository.findById(eventDetails.getEvent_id()).orElseThrow(()->new ValidationException("Event not found"));
        ev.setAttendees_number(eventDetails.getAttendees_number());
        ev.setDescription(eventDetails.getDescription());
        ev.setStart_date(eventDetails.getStart_date());
        ev.setEnd_date(eventDetails.getEnd_date());
        ev.setName(eventDetails.getName());
        ev.setCoordinate(eventDetails.getCoordinate());
        return this.eventRepository.save(ev);
    }

    public Event insertImage(Long id, MultipartFile image) {
        Event event = this.eventRepository.findById(id).orElseThrow(() -> new ValidationException("event not found"));
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        Image dbFile = new Image();
        dbFile.setFileName(fileName);
        dbFile.setFileType(image.getContentType());
        try {
            dbFile.setData(image.getBytes());
        } catch (IOException e) {
        }
        event.setImage(dbFile);
        return this.eventRepository.save(event);
    }
}
