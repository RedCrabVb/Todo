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
}
