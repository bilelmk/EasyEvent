package com.event_manager.userservice.controllers;

import com.event_manager.userservice.dto.ThinUserDTO;
import com.event_manager.userservice.models.User;
import com.event_manager.userservice.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users" )
public class UserController {


    @Autowired
    private UserService userService;

    @GetMapping(produces = "application/json")
    public List<User> all() {
        return this.userService.findAllUsers();
    }

    @GetMapping({"/thin"})
    public List<ThinUserDTO> findAllUsers() {
        return this.userService.findThinUsers();
    }


    @GetMapping({"/search/{id}"})
    public List<ThinUserDTO> searchUsers(@PathVariable Long id , @RequestParam int page, @RequestParam int size , @RequestParam String filter) {
        return this.userService.searchUsers(id , page , size , filter);
    }

    @GetMapping({"/group/{id}"})
    public List<ThinUserDTO> findByGroupId(@PathVariable Long id ) {
        return this.userService.findByGroupId(id);
    }

    @GetMapping("{id}")
    public User findOne(@PathVariable Long id) {

        return this.userService.findUser(id);
    }

    @PostMapping(value = "/addusers" , consumes = "application/json", produces = "application/json")
    public void create(@RequestBody List<User> users) {
        userService.createUsers(users);
    }

    @PostMapping(value = "/adduser" , consumes = "application/json", produces = "application/json")
    public void create(@RequestBody User user) {
        userService.createUser(user);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @PutMapping("{id}")
    public User updateUser(@PathVariable(value = "id") Long user_id,  @RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @PutMapping("image/{id}")
    public User insertImage(@PathVariable Long id,@RequestBody MultipartFile image){
        return this.userService.insertImage(id,image);
    }

}
