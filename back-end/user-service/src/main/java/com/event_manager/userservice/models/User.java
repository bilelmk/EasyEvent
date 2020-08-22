package com.event_manager.userservice.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table (name = "Userr")
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id" ,referencedColumnName = "address_id")
    private Address address;

    @OneToOne(fetch=FetchType.EAGER,cascade = {CascadeType.MERGE})
    private Image image;

    @ManyToOne
    @JoinColumn(name = "group_id" )
    private Grp grp ;
}
