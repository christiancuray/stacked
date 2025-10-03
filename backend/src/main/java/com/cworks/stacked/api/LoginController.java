package com.cworks.stacked.api;


import com.cworks.stacked.dto.AuthenticationResponse;
import com.cworks.stacked.dto.LoginRequest;
import com.cworks.stacked.dto.RegisterRequest;
import com.cworks.stacked.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final AuthService authservice;

    @Autowired
    public LoginController(AuthService authservice) {
        this.authservice = authservice;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req){
        try {
            AuthenticationResponse authRes = authservice.register(req);
            return new ResponseEntity<>(authRes, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        AuthenticationResponse authRes =  authservice.login(req);
        if(authRes == null){
            System.out.println("login failed");
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        } else {
            System.out.println("login successful");
            return new ResponseEntity<>(authRes, HttpStatus.OK);
        }
    }

}
