package ru.vivt.planner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.planner.domain.SmartTask;
import ru.vivt.planner.repository.SmartTaskRepository;
import ru.vivt.planner.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping(path = "smarttask")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SmartTaskController {
    @Autowired
    private SmartTaskRepository smartTaskRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("save")
    public SmartTask save(@RequestBody SmartTask smartTask, Authentication authentication) {
        smartTask.setIdUser(userRepository.findByLogin(authentication.getName()).getId());
        return smartTaskRepository.save(smartTask);
    }

    @GetMapping
    public List<SmartTask> get(Authentication authentication) {
        var user = userRepository.findByLogin(authentication.getName());
        return smartTaskRepository.findByIdUser(user.getId());
    }

    @DeleteMapping("{id}")
    public SmartTask delete(@PathVariable Long id, Authentication authentication) {
        SmartTask task = smartTaskRepository.findById(id).orElseThrow();
        if (task.getIdUser().equals(userRepository.findByLogin(authentication.getName()).getId())) {
            smartTaskRepository.delete(task);
        }
        return task;
    }
}
