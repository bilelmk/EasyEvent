package com.event_manager.eventservice.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Userr")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    private boolean active;

    private String roles;

    private String first_name;

    private String last_name;

    private String phone;

    @ManyToOne
    @JoinColumn(name = "group_id" )
    private Grp grp ;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id" ,referencedColumnName = "address_id")
    private Address address;
}
