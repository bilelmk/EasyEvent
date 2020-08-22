package com.event_manager.eventservice.dto.Invitation;

import com.event_manager.eventservice.dto.Event.EventDTO;
import com.event_manager.eventservice.dto.User.UserDTO;
import lombok.Data;

@Data
public class InvitationDTO {

    private Long invitation_id ;

    private String status ;

    private String grp ;

    private UserDTO user;

    private EventDTO event ;
}
