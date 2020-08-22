package com.event_manager.authservice.controllers;

import com.event_manager.authservice.models.AuthenticationRequest;
import com.event_manager.authservice.models.AuthenticationResponse;
import com.event_manager.authservice.models.MyUserDetails;
import com.event_manager.authservice.models.User;
import com.event_manager.authservice.repositories.UserRepository;
import com.event_manager.authservice.services.MyUserDetailsService;
import com.event_manager.authservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public User postAuthData(@RequestBody User user){
        return userDetailsService.creatUser(user) ;
    }

//    @CrossOrigin(origins = "*")
//    @PostMapping(value = "/addusers" , consumes = "application/json", produces = "application/json")
//    public void create(@RequestBody List<User> users) {
//        userDetailsService.createUsers(users);
//    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            Authentication a = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final MyUserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt , userDetails));
    }

}
