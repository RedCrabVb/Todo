package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.domain.SmartTask;
import ru.vivt.TodoREST.repository.NoteRepository;
import ru.vivt.TodoREST.repository.SmartTaskRepository;
import ru.vivt.TodoREST.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping(path = "smarttask")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SmartTaskController {
    @Autowired
    private SmartTaskRepository smartTaskRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("add")
    public SmartTask addSmartTask(@RequestBody SmartTask smartTask, Authentication authentication) {
        smartTask.setIdUser(userRepository.findByLogin(authentication.getName()).getId());
        smartTaskRepository.save(smartTask);
        return smartTask;
    }

    @GetMapping
    public List<SmartTask> getAllSmartTask(Authentication authentication) {
        var user = userRepository.findByLogin(authentication.getName());
        return smartTaskRepository.findByIdUser(user.getId());
    }
}
