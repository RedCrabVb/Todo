package ru.vivt.TodoREST.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.TodoREST.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}