package com.cworks.stacked.api;


import com.cworks.stacked.model.User;
import com.cworks.stacked.service.LoginService;
import com.cworks.stacked.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final LoginService loginservice;

    @Autowired
    public LoginController(LoginService loginservice) {
        this.loginservice = loginservice;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        User registeredUser = loginservice.register(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody User user) {
        Boolean isValid = loginservice.login(user);
        if (Boolean.TRUE.equals(isValid)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(401).body(false);
        }
    }

}
