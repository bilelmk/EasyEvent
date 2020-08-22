package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Session;
import com.event_manager.eventservice.models.SubSession;
import com.event_manager.eventservice.repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository ;

//    public List<Session> findAllSessions(){
//        return this.sessionRepository.findAll();
//    }
//
//    public Session createSession(Session session){
//        return this.sessionRepository.save(session);
//    }

    public void deleteSession(Long id){
        this.sessionRepository.deleteById(id);
    }

    public Session updateSession(Session sessionDetails) {
        Session session =this.sessionRepository.findById(sessionDetails.getSession_id()).orElseThrow(()->new ValidationException("Session not found"));
        session.setTitle(sessionDetails.getTitle());
        session.setDescription(sessionDetails.getDescription());
        session.setStart_time(sessionDetails.getStart_time());
        session.setEnd_time(sessionDetails.getEnd_time());
        return this.sessionRepository.save(session);
    }


    public Session addSubSessionToSession(Long Id , SubSession subSession){
        Session session = sessionRepository.findById(Id).orElseThrow(()->new ValidationException("Session with the id %s not found" + Id));
        session.getSubSessions_list().add(subSession);
        return  sessionRepository.save(session);
    }
}
