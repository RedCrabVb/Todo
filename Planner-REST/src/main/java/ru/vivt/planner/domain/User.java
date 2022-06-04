package ru.vivt.planner.domain;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;


@Entity
@Table(name = "t_user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String email;
    private String password;

    private String chatIdTg; //confirmed, secret
    private boolean confirmedTg;
    private String secretTokenTg;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getChatIdTg() {
        return chatIdTg;
    }

    public void setChatIdTg(String chatIdTg) {
        this.chatIdTg = chatIdTg;
    }

    public boolean isConfirmedTg() {
        return confirmedTg;
    }

    public void setConfirmedTg(boolean confirmedTg) {
        this.confirmedTg = confirmedTg;
    }

    public String getSecretTokenTg() {
        return secretTokenTg;
    }

    public void setSecretTokenTg(String secretTokenTg) {
        this.secretTokenTg = secretTokenTg;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }



    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public String getPassword() {
        return password;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}