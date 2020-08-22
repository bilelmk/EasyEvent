package com.event_manager.eventservice.services;

import com.event_manager.eventservice.dto.Invitation.InvitationDTO;
import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Invitation;
import com.event_manager.eventservice.repositories.InvitationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvitationService {

    Logger logger = LoggerFactory.getLogger(InvitationService.class);

    @Autowired
    private InvitationRepository invitationRepository ;

    @Autowired
    private MapService mapService ;




    public List<InvitationDTO> getInvitationsByEvent(Long id){
        List<Invitation> invitations =  this.invitationRepository.findInvitationByEvent(id) ;
        return invitations.stream().map(invitation -> mapService.convert(invitation, InvitationDTO.class)).collect(Collectors.toList());
    }

    public List<InvitationDTO> getAcceptedInvitations(Long id){
        List<Invitation> invitations =  this.invitationRepository.findAcceptedInvitations(id) ;
        return invitations.stream().map(invitation -> mapService.convert(invitation, InvitationDTO.class)).collect(Collectors.toList());
    }


    public List<Invitation> getInvitationsByUser(Long id){
        return this.invitationRepository.findInvitationsByUser(id) ;
    }

    public List<Invitation> getUserAcceptedInvitaion(Long id){
        return this.invitationRepository.findUserAcceptedInvitations(id) ;
    }

    public void updateInvitations(List<Invitation> invitations){
        invitations.forEach(invitation -> {
            this.invitationRepository.save(invitation) ;
        });
    }

    public Invitation acceptInvitation(Long id) {
        Invitation invitaion = this.invitationRepository.findById(id).orElseThrow(()->new ValidationException("Invitation not found"));
        invitaion.setStatus("accepted");
        return this.invitationRepository.save(invitaion);
    }

//    public void confirmComming(List<Invitation> invitations) {
//        for (Invitation invitation: invitations){
//            Invitation inv = this.invitationRepository.findById(invitation.getInvitation_id()).orElseThrow(()->new ValidationException("Invitation not found"));
//            inv.setHasArrived(invitation.isHasArrived());
//            this.invitationRepository.save(inv);
//        }
//    }

}
