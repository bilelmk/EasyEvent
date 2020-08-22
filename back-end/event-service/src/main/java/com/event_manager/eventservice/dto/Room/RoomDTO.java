package com.event_manager.eventservice.dto.Room;

import com.event_manager.eventservice.dto.Event.EventDTO;
import com.event_manager.eventservice.dto.User.UserDTO;
import lombok.Data;

@Data
public class RoomDTO {

    private Long room_id ;

    private EventDTO event ;

    private UserDTO user1 ;

    private UserDTO user2 ;

    private UserDTO user3 ;

    private String room_name  ;
}
