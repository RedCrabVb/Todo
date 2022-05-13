package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.domain.SmartTask;

import java.util.List;

public interface SmartTaskRepository extends JpaRepository<SmartTask, Long> {
    List<SmartTask> findByIdUser(Long idUser);
}
