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
    private String time;
    private String date;
    private Long idUser;

    public TimeTracker() {}

    public TimeTracker(Long id, String nameTask, Long idSmartTask, String time, String date) {
        this.id = id;
        this.nameTask = nameTask;
        this.idSmartTask = idSmartTask;
        this.time = time;
        this.date = date;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
