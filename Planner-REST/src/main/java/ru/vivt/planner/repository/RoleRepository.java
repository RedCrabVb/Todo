package ru.vivt.planner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vivt.planner.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}