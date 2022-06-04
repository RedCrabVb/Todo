package ru.vivt.planner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.vivt.planner.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
    @Query("select u FROM User u WHERE u.chatIdTg = ?1")
    Optional<List<User>> findByChatId(String chatIdTg);
}