package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.User;
import ru.vivt.TodoREST.service.UserService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

    @Autowired
    private UserService userService;


    @GetMapping("/hello")
    public String hello() { return "hello"; }

    @PostMapping("/registration")
    public User addUser(User user) {

        if (!userService.saveUser(user)){
            throw new IllegalStateException("Can't not save user");
        }

        return user;
    }

    @GetMapping("version")
    public String version() {
        return "1.4";
    }

    @GetMapping("user_info")
    public User userInfo(Authentication authentication) {
        var user = userService.getUserRepository().findByLogin(authentication.getName());
        return user;
    }
}
