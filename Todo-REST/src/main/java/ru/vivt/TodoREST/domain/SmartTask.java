package ru.vivt.TodoREST.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "t_smarttask")
public class SmartTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String specific; //конкретный
    private String measurable; //измеримый
    private String achievable; //достижимый
    private String relevant; //значемый
    private String timeBound; //ограничения
}
