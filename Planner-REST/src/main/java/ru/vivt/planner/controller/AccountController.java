package ru.vivt.planner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.planner.domain.User;
import ru.vivt.planner.service.UserService;

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

    @PostMapping("/disable_tg")
    public User disableTelegram(Authentication authentication) {
        var user = userService.getUserRepository().findByLogin(authentication.getName());
        user.setConfirmedTg(false);
        user.setChatIdTg(null);
        user.setSecretTokenTg(null);
        userService.getUserRepository().save(user);
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
