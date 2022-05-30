package ru.vivt.TodoREST.domain;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;

@Entity
@Table(name = "t_note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition="TEXT")
    private String head;
    @Column(columnDefinition="TEXT")
    private String body;
    private boolean pined;
    private boolean encrypted;
    private Long idUser;

    private String passwordEncrypted;

    public Note() {}

    public Note(Long id, String head, String body, String passwordEncrypted) {
        this.id = id;
        this.head = head;
        this.body = body;
        this.passwordEncrypted = passwordEncrypted;
    }

    public boolean isPined() {
        return pined;
    }

    public void setPined(boolean pined) {
        this.pined = pined;
    }

    public boolean isEncrypted() {
        return encrypted;
    }

    public void setEncrypted(boolean encrypted) {
        this.encrypted = encrypted;
    }

    public String getPasswordEncrypted() {
        return passwordEncrypted;
    }

    public void setPasswordEncrypted(String passwordEncrypted) {
        this.passwordEncrypted = passwordEncrypted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
