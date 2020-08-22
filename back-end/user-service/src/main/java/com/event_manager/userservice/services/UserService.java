package com.event_manager.userservice.services;

import com.event_manager.userservice.dto.ThinUserDTO;
import com.event_manager.userservice.exception.ValidationException;
import com.event_manager.userservice.models.Image;
import com.event_manager.userservice.models.User;
import com.event_manager.userservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MapService mapService ;

    public User findUser(Long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new ValidationException("user not found"));
    }

    public List<User> findAllUsers() {
        return this.userRepository.findAll();
    }

    public List<ThinUserDTO> findThinUsers() {
        List<User> users = this.userRepository.findAll();
        return users.stream().map(goody -> mapService.convert(goody, ThinUserDTO.class)).collect(Collectors.toList());
    }
    public List<ThinUserDTO> searchUsers(Long id , int page_number , int size , String filter ) {
        Pageable page  = PageRequest.of(page_number, size);
        List<User> users =this.userRepository.search(id , filter  , page);
        return users.stream().map(goody -> mapService.convert(goody, ThinUserDTO.class)).collect(Collectors.toList());
    }

    public List<ThinUserDTO> findByGroupId(Long id) {
        List<User> users =this.userRepository.findByGroup(id);
        return users.stream().map(goody -> mapService.convert(goody, ThinUserDTO.class)).collect(Collectors.toList());
    }

    public void createUsers(List<User> users) {
        for (User user : users) {
            this.userRepository.save(user);
        }
    }

    public void createUser(User user) {
        this.userRepository.save(user);
    }

    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }

    public User updateUser(User user) {
        return this.userRepository.save(user);
    }

    public User insertImage(Long id, MultipartFile image) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new ValidationException("user not found"));
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        Image dbFile = new Image();
        dbFile.setFileName(fileName);
        dbFile.setFileType(image.getContentType());
        try {
            dbFile.setData(image.getBytes());
        } catch (IOException e) {
        }
        user.setImage(dbFile);
        return this.userRepository.save(user);
    }



}






