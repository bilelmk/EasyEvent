package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.dto.Invitation.InvitationDTO;
import com.event_manager.eventservice.models.Invitation;
import com.event_manager.eventservice.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService ;

    // get all invitations for an event
    @GetMapping("/event/{id}")
    public List<InvitationDTO> findInvitationsByEvent(@PathVariable Long id) {
        return invitationService.getInvitationsByEvent(id);
    }
    // get accepted invitation for an event
    @GetMapping("/event/accepted/{id}")
    public List<InvitationDTO> findAcceptedInvitations(@PathVariable Long id) {
        return invitationService.getAcceptedInvitations(id);
    }

    // get invitations for a user
    @GetMapping("/user/{id}")
    public List<Invitation> findInvitationsByUser(@PathVariable Long id) {
        return invitationService.getInvitationsByUser(id);
    }

    // get accepted invitation for a user
    @GetMapping("/user/accepted/{id}")
    public List<Invitation> findAcceptedInvitaion(@PathVariable Long id) {
        return invitationService.getUserAcceptedInvitaion(id);
    }


//    @PostMapping()
//    public Invitation addInvitation(@RequestBody Invitation invitation) {
//        return invitationService.createInvitation(invitation);
//    }
//
//    @PostMapping("/arrived")
//    public void acceptInvitation(@RequestBody List<Invitation> invitations) {
//        invitationService.confirmComming(invitations);
//    }
//

    // accept invitation by the user
    @PutMapping("/user/{id}")
    public Invitation acceptInvitation(@PathVariable Long id) {
        return invitationService.acceptInvitation(id);
    }

    // update invitations status for an event
    @PutMapping()
    public void acceptInvitation(@RequestBody List<Invitation> invitations) {
        invitationService.updateInvitations(invitations);
    }

}
