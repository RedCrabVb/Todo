package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
