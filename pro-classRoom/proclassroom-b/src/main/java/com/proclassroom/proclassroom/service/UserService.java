
package com.proclassroom.proclassroom.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.proclassroom.proclassroom.model.User;

public interface UserService {

    UserDetailsService userDetailsService();

    void deleteUserById(Integer id);

    Optional<UserDetails> findById(Integer id);

    UserDetails getByIdOrThrow(Integer id);

    User getUserById(Integer userId);

    // UserDTO getClassUserById(Integer userId);
}
