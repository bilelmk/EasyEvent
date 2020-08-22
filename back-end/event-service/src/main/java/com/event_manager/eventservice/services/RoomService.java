package com.event_manager.eventservice.services;

import com.event_manager.eventservice.dto.Room.RoomDTO;
import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Room;
import com.event_manager.eventservice.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository ;

    @Autowired
    private MapService mapService ;

    public List<RoomDTO> findEventRooms(Long id){
        List<Room> rooms = this.roomRepository.findByEventId( id );
        return rooms.stream().map(room -> mapService.convert(room, RoomDTO.class)).collect(Collectors.toList());
    }

    public void deleteRoom(Long id){
        this.roomRepository.deleteById(id);
    }

    public Room createRoom(Room room) {
        return this.roomRepository.save(room) ;
    }

    public Room updateRoom(Room roomDetails) {
        Room room = this.roomRepository.findById(roomDetails.getRoom_id()).orElseThrow(()->new ValidationException("Room not found"));
        room.setUser1(roomDetails.getUser1());
        room.setUser2(roomDetails.getUser2());
        room.setUser3(roomDetails.getUser3());
        room.setRoom_name(roomDetails.getRoom_name());
        return this.roomRepository.save(room);
    }

    public RoomDTO findUserRoom( Long event_id , Long user_id ){
        Room room = this.roomRepository.findUserRoom(event_id ,  user_id) ;
        RoomDTO roomdto = mapService.convert(room, RoomDTO.class) ;
        return roomdto ;
    }
}
