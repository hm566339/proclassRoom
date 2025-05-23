package com.proclassroom.proclassroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proclassroom.proclassroom.dto.JwtAuthenticationResponse;
import com.proclassroom.proclassroom.dto.SigninRequest;
import com.proclassroom.proclassroom.dto.SingnUpRequset;
import com.proclassroom.proclassroom.model.User;
import com.proclassroom.proclassroom.repository.UserRepository;
import com.proclassroom.proclassroom.service.AuthenticationService;
import com.proclassroom.proclassroom.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/aurth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthenticationController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    private final AuthenticationService authenticationService;

    @PostMapping("/singup")
    public ResponseEntity<User> signup(@RequestBody SingnUpRequset singnUpRequset) {
        System.out.println("Received SignUpRequest: " + singnUpRequset);
        return ResponseEntity.ok(authenticationService.singnup(singnUpRequset));
    }

    @GetMapping("/singup")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest) {
        return ResponseEntity.ok(authenticationService.singin(signinRequest));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

}
