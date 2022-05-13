package ru.vivt.TodoREST.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "t_timetracker")
public class TimeTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameTask;
    private Long idSmartTask;
    private int time;

    public TimeTracker(Long id, String nameTask, Long idSmartTask, int time) {
        this.id = id;
        this.nameTask = nameTask;
        this.idSmartTask = idSmartTask;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameTask() {
        return nameTask;
    }

    public void setNameTask(String nameTask) {
        this.nameTask = nameTask;
    }

    public Long getIdSmartTask() {
        return idSmartTask;
    }

    public void setIdSmartTask(Long idSmartTask) {
        this.idSmartTask = idSmartTask;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }
}
