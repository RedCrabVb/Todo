package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.TimeTracker;

import java.util.List;

public interface TimerTrackerRepository extends JpaRepository<TimeTracker, Long>  {
    List<TimeTracker> findByIdUser(Long idUser);
}
