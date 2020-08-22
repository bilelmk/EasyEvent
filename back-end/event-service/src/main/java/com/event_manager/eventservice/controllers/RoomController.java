package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.dto.Room.RoomDTO;
import com.event_manager.eventservice.models.Room;
import com.event_manager.eventservice.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("{id}")
    public List<RoomDTO> all(@PathVariable Long id) {
        return this.roomService.findEventRooms(id);
    }

    @GetMapping("{event_id}/{user_id}")
    public RoomDTO userRoom(@PathVariable Long event_id , @PathVariable Long user_id ) {
        return roomService.findUserRoom(event_id , user_id) ;
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public Room create(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @PutMapping
    public Room edit(@RequestBody Room room) {
        return roomService.updateRoom(room);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

}
