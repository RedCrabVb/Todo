package ru.vivt.TodoREST.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.repository.NoteRepository;
import ru.vivt.TodoREST.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping(path = "note")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NoteController {
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("save")
    public Note save(@RequestBody Note note, Authentication authentication) {
        note.setIdUser(userRepository.findByLogin(authentication.getName()).getId());
        noteRepository.save(note);
        return note;
    }

    @GetMapping
    public List<Note> get(Authentication authentication) {
        var user = userRepository.findByLogin(authentication.getName());
        return noteRepository.findByIdUser(user.getId());
    }

    @DeleteMapping("{id}")
    public Note delete(@PathVariable Long id, Authentication authentication) {
        Note note = noteRepository.findById(id).orElseThrow();
        if (note.getIdUser().equals(userRepository.findByLogin(authentication.getName()).getId())) {
            noteRepository.delete(note);
        }
        return note;
    }


}
