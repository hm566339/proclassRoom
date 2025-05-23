
package com.proclassroom.proclassroom.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.dto.SigninRequest;
import com.proclassroom.proclassroom.dto.JwtAuthenticationResponse;
import com.proclassroom.proclassroom.dto.RefreshTokenRequest;
import com.proclassroom.proclassroom.dto.SingnUpRequset;
import com.proclassroom.proclassroom.model.Role;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.UserRepository;
import com.proclassroom.proclassroom.service.AuthenticationService;
import com.proclassroom.proclassroom.service.JWTservice;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTservice jwtService;

    @Override
    public User singnup(SingnUpRequset singnUpRequset) {
        User user = new User();
        user.setEmail(singnUpRequset.getEmail());
        user.setAddress(singnUpRequset.getAddress());
        user.setMobilenumber(singnUpRequset.getMobilenumber());
        user.setFirstname(singnUpRequset.getFirstname());
        user.setSecondname(singnUpRequset.getSecondname());
        user.setRole(Role.valueOf(singnUpRequset.getRole().toUpperCase()));
        user.setPassword(passwordEncoder.encode(singnUpRequset.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public JwtAuthenticationResponse singin(SigninRequest signinRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signinRequest.getEmail(),
                        signinRequest.getPassword()));

        User user = userRepository.findByEmail(signinRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String jwt = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUsername(refreshTokenRequest.getToken());

        if (userEmail == null) {
            throw new AuthenticationException("Invalid refresh token") {
            };
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new AuthenticationException("User not found") {
                });

        if (!jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            throw new AuthenticationException("Invalid refresh token") {
            };
        }

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", user.getRole().name());

        String jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .refreshToken(refreshTokenRequest.getToken())
                .userId(user.getId())
                .role(user.getRole().name())
                .build();
    }
}
