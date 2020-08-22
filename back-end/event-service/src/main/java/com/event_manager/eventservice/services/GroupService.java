package com.event_manager.eventservice.services;

import com.event_manager.eventservice.exception.ValidationException;
import com.event_manager.eventservice.models.Grp;
import com.event_manager.eventservice.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public List<Grp> findAllGroups() {
        return this.groupRepository.findAll() ;
    }

    public Grp createGroup(Grp grp) {
        return this.groupRepository.save(grp) ;
    }

    public Grp updateGroup(Grp groupDetails) {
        Grp group = this.groupRepository.findById(groupDetails.getGroup_id()).orElseThrow(()->new ValidationException("Group not found"));
        group.setDescription(groupDetails.getDescription());
        group.setName(groupDetails.getName());
        return this.groupRepository.save(group);
    }

    public void deleteGroup(Long id) {
        this.groupRepository.deleteById(id);
    }



}
