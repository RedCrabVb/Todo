package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.TimeTracker;
import ru.vivt.TodoREST.repository.SmartTaskRepository;
import ru.vivt.TodoREST.repository.TimerTrackerRepository;
import ru.vivt.TodoREST.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping(path = "timertracker")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TimerTrackerController {
    @Autowired
    private TimerTrackerRepository timerTrackerRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("save")
    public TimeTracker save(@RequestBody TimeTracker smartTask, Authentication authentication) {
        smartTask.setIdUser(userRepository.findByLogin(authentication.getName()).getId());
        timerTrackerRepository.save(smartTask);
        return smartTask;
    }

    @GetMapping
    public List<TimeTracker> get(Authentication authentication) {
        var user = userRepository.findByLogin(authentication.getName());
        return timerTrackerRepository.findByIdUser(user.getId());
    }

    @DeleteMapping("{id}")
    public TimeTracker delete(@PathVariable Long id, Authentication authentication) {
        TimeTracker task = timerTrackerRepository.findById(id).orElseThrow();
        if (task.getIdUser().equals(userRepository.findByLogin(authentication.getName()).getId())) {
            timerTrackerRepository.delete(task);
        }
        return task;
    }
}
