package com.cworks.stacked.service;

import com.cworks.stacked.dto.LoginRequest;
import com.cworks.stacked.dto.RegisterRequest;
import com.cworks.stacked.dto.AuthenticationResponse;
import com.cworks.stacked.model.User;
import com.cworks.stacked.repository.RepoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cworks.stacked.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private RepoUser repoUser;

    @Autowired
    private JwtUtil jwtService;

    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    // register a new user and return the username
    public AuthenticationResponse register(RegisterRequest req){
        System.out.println("registering user: " + req.getUsername());
        if(repoUser.existsByUsername(req.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        if(repoUser.existsByEmail(req.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(bcrypt.encode(req.getPassword()));
        repoUser.save(u);
        return new AuthenticationResponse(u.getUsername(), null);
    }

    // check if the user exists and the password is matcg with the hashed password and return the token
    public AuthenticationResponse login( LoginRequest req){
        System.out.println("attempting login for username: " + req.getUsername());
        User existingUser = repoUser.findByUsername(req.getUsername());
        if(existingUser != null && bcrypt.matches(req.getPassword(), existingUser.getPassword())) {
            System.out.println("password match for user: " + req.getUsername());
            String token = jwtService.generateToken(req.getUsername());
            return new AuthenticationResponse(req.getUsername(), token);
        }

        return null;
    }
}
