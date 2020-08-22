package com.event_manager.authservice.models;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private MyUserDetails user ;

    public AuthenticationResponse(String jwt ,MyUserDetails user ) {
        this.jwt = jwt;
        this.user = user ;
    }

    public String getJwt() {
        return jwt;
    }

    public MyUserDetails getUser() {
        return user;
    }

    public void setUser(MyUserDetails user) {
        this.user = user;
    }
}
