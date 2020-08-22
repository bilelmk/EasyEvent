package com.event_manager.userservice.dto;

import com.event_manager.userservice.models.Grp;
import lombok.Data;

@Data
public class ThinUserDTO {
    private Long user_id;

    private String email;

    private String first_name;

    private String last_name;

    private String phone;

    private String roles;

//    private Grp grp ;
}
