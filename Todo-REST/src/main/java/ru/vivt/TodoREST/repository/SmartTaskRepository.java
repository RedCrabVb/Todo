package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.vivt.TodoREST.domain.Note;
import ru.vivt.TodoREST.domain.SmartTask;

import java.util.List;

public interface SmartTaskRepository extends JpaRepository<SmartTask, Long> {
    List<SmartTask> findByIdUser(Long idUser);
//    @Query("SELECT t FROM t_smarttask t WHERE t.isCompleted = false")
//    List<SmartTask> findOverdueTasksWithTgSubscription();//todo: fix query
}
