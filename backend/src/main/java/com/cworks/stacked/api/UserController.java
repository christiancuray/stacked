package com.cworks.stacked.api;

import com.cworks.stacked.service.UserService;
import com.cworks.stacked.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable  int id){
        User user = userService.getUserById(id);
        return user != null ? user : null;
    }


}