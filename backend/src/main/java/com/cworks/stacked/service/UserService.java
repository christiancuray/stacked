package com.cworks.stacked.service;

import com.cworks.stacked.repository.RepoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.cworks.stacked.dto.AuthenticationResponse;
import com.cworks.stacked.dto.RegisterRequest;
import com.cworks.stacked.model.User;


@Service
public class UserService {

    @Autowired
    RepoUser userRepository;

    // add user
    public AuthenticationResponse addUser(RegisterRequest userDTO) {
        User user = new User();
        // user id is auto-generated
        user.setEmail(userDTO.getEmail());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        userRepository.save(user);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setUsername(user.getUsername());

        return authenticationResponse;

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
        existingUser.setBio(user.getBio());
        userRepository.save(existingUser);
        return existingUser;
    }
}