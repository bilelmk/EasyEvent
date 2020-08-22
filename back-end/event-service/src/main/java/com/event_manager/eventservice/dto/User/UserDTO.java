package com.event_manager.eventservice.dto.User;

import lombok.Data;

@Data
public class UserDTO {
    private Long user_id;

    private String first_name;

    private String email;

    private String last_name;

    private String phone;

    private String username;

}
