package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.repository.NoteRepository;

@RestController
@RequestMapping(path = "note")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;

    @PostMapping("add")
    public Note addNote(@RequestBody Note note, Authentication authentication) {
        noteRepository.save(note);
        System.out.println(authentication.getName());
        return note;
    }

    @GetMapping("version")
    public String version() {
        return "1.1";
    }
}
