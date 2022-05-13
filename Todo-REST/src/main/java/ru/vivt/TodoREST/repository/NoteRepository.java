package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.domain.User;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByIdUser(Long idUser);
}
