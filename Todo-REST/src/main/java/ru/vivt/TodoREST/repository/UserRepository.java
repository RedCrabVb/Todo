package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}