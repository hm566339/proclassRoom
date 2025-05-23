
package com.proclassroom.proclassroom.service.impl;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.UserRepository;
import com.proclassroom.proclassroom.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<UserDetails> findById(Integer id) {
        return userRepository.findById(id).map(u -> (UserDetails) u);
    }

    @Override
    public UserDetails getByIdOrThrow(Integer id) {
        return findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null); // Return null if user not found
    }
}
