package com.cworks.stacked.service;

import org.springframework.stereotype.Service;

import com.cworks.stacked.repository.UserRepository;
import com.cworks.stacked.model.*;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user) {
        userRepository.addUser(user);
    }

    public User getUserById(int id){
        return userRepository.getUserById(id);
    }
}