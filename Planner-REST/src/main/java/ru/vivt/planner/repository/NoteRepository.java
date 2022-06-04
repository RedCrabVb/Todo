package ru.vivt.planner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.planner.domain.Note;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByIdUser(Long idUser);
}
