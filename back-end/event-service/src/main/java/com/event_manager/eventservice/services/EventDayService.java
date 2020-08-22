package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.EventDay;
import com.event_manager.eventservice.models.Session;
import com.event_manager.eventservice.repositories.EventDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventDayService {

    @Autowired
    private EventDayRepository eventDayRepository ;


//    public List<EventDay> findAllEventDays(){
//        return this.eventDayRepository.findAll();
//    }
//
//    public EventDay createEventDay(EventDay eventDay){
//        return this.eventDayRepository.save(eventDay);
//    }

    public void deleteEventDay(Long id){
        this.eventDayRepository.deleteById(id);
    }

    public EventDay updateEventDay(EventDay eventDayDetails) {
        EventDay eventDay =this.eventDayRepository.findById(eventDayDetails.getDay_id()).orElseThrow(()->new ValidationException("EventDay not found"));
        eventDay.setDay(eventDayDetails.getDay());
        eventDay.setStart_activity(eventDayDetails.getStart_activity());
        eventDay.setEnd_activity(eventDayDetails.getEnd_activity());
        return this.eventDayRepository.save(eventDay);
    }

    public EventDay addSessionToEventDay(Long Id , Session session){
        EventDay day = eventDayRepository.findById(Id).orElseThrow(()->new ValidationException("Event Day with the id %s not found" + Id));
        day.getSessions_list().add(session);
        return  eventDayRepository.save(day);
    }

}
