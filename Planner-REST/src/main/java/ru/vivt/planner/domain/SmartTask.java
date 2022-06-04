package ru.vivt.planner.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "t_smarttask")
public class SmartTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String specific; //конкретный
    @Column(columnDefinition="TEXT")
    private String measurable; //измеримый
    @Column(columnDefinition="TEXT")
    private String achievable; //достижимый
    @Column(columnDefinition="TEXT")
    private String relevant; //значемый
    private Date timeBound; //ограничения
    private boolean isCompleted = false;
    private Long idUser;

    public SmartTask() {

    }

    public SmartTask(Long id, String specific, String measurable, String achievable, String relevant, Date timeBound, boolean isCompleted, Long idUser) {
        this.id = id;
        this.specific = specific;
        this.measurable = measurable;
        this.achievable = achievable;
        this.relevant = relevant;
        this.timeBound = timeBound;
        this.isCompleted = isCompleted;
        this.idUser = idUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecific() {
        return specific;
    }

    public void setSpecific(String specific) {
        this.specific = specific;
    }

    public String getMeasurable() {
        return measurable;
    }

    public void setMeasurable(String measurable) {
        this.measurable = measurable;
    }

    public String getAchievable() {
        return achievable;
    }

    public void setAchievable(String achievable) {
        this.achievable = achievable;
    }

    public String getRelevant() {
        return relevant;
    }

    public void setRelevant(String relevant) {
        this.relevant = relevant;
    }


    public Date getTimeBound() {
        return timeBound;
    }

    public void setTimeBound(Date timeBound) {
        this.timeBound = timeBound;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }


    @Override
    public String toString() {
        return "SmartTask{" +
                "id=" + id +
                ", specific='" + specific + '\'' +
                ", measurable='" + measurable + '\'' +
                ", achievable='" + achievable + '\'' +
                ", relevant='" + relevant + '\'' +
                ", timeBound=" + timeBound +
                ", isCompleted=" + isCompleted +
                ", idUser=" + idUser +
                '}';
    }
}
