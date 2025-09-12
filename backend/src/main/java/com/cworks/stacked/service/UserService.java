package com.cworks.stacked.service;

import com.cworks.stacked.repository.RepoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.cworks.stacked.model.*;

@Service
public class UserService {

    @Autowired
    RepoUser userRepository;


    // add user
    public User addUser(User user) {
       return userRepository.save(user);
    }

    // get user by id
    public User getUserById(int id){
        return userRepository.findById(id).orElse(null);
    }


    // get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // delete user by id
    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }


    // count users
    public long countUser(){
        return userRepository.count();
    }


    // update user
    public User updateUser(int id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null){
            return null;
        }
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setDisplayName(user.getDisplayName());
        existingUser.setBio(user.getBio());
        userRepository.save(existingUser);
        return existingUser;
    }
}