package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.User;
import ru.vivt.TodoREST.service.UserService;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

    @Autowired
    private UserService userService;


    @GetMapping("/hello")
    public @ResponseBody String hello() { return "hello"; }

    @PostMapping("/hello")
    public @ResponseBody  String hello2() {
        return "hello post";
    }

    @PostMapping("/registration")
    public @ResponseBody User addUser(User user) {

        if (!userService.saveUser(user)){
            throw new IllegalStateException("Can't not save user");
        }

        return user;
    }

    @GetMapping("version")
    public @ResponseBody String version() {
        return "1.3";
    }
}
