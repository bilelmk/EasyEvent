package com.event_manager.eventservice.dto.Event;

import lombok.Data;

@Data
public class EventDTO {
    private Long event_id;

    private String name;

    private String description;
}
