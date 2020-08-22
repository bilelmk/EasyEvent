package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.SubSession;
import com.event_manager.eventservice.repositories.SubSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubSessionService {


    @Autowired
    private SubSessionRepository subSessionRepository ;

//    public List<SubSession> findAllSessions(){
//        return this.subSessionRepository.findAll();
//    }
//
//    public SubSession createSession(SubSession subSession){
//        return this.subSessionRepository.save(subSession);
//    }

    public void deleteSession(Long id){
        this.subSessionRepository.deleteById(id);
    }

    public SubSession updateSubSession(SubSession subSessionDetails) {
        SubSession subSession =this.subSessionRepository.findById(subSessionDetails.getSubsession_id()).orElseThrow(()->new ValidationException("SubSession not found"));
        subSession.setTitle(subSessionDetails.getTitle());
        subSession.setDescription(subSessionDetails.getDescription());
        subSession.setStart_time(subSessionDetails.getStart_time());
        subSession.setEnd_time(subSessionDetails.getEnd_time());
        return this.subSessionRepository.save(subSession);
    }
}
