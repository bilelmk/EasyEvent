package com.event_manager.eventservice.controllers;

import com.event_manager.eventservice.models.Grp;
import com.event_manager.eventservice.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Grp> get() {
        return groupService.findAllGroups() ;
    }

    @PutMapping
    public Grp edit(@RequestBody Grp group) {
        return groupService.updateGroup(group);
    }

    @PostMapping()
    public Grp add(@RequestBody Grp grp) {
        return groupService.createGroup(grp);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        groupService.deleteGroup(id);
    }

}
