package com.event_manager.authservice.services;

import com.event_manager.authservice.models.MyUserDetails;
import com.event_manager.authservice.models.User;
import com.event_manager.authservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public MyUserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(s);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + s));
        return user.map(MyUserDetails::new).get();
    }

    public User creatUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }


}
