
package com.proclassroom.proclassroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.model.Role;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role); // Finds by enum

    // Helper method to find by role name (String)
    default List<User> findByRoleName(String roleName) {
        try {
            return findByRole(Role.valueOf(roleName.toUpperCase()));
        } catch (IllegalArgumentException e) {
            // Handle case where roleName doesn't match any enum value
            return List.of(); // Return empty list or throw custom exception
        }
    }
}