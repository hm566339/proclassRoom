package com.proclassroom.proclassroom.service;

import com.proclassroom.proclassroom.dto.JwtAuthenticationResponse;
import com.proclassroom.proclassroom.dto.RefreshTokenRequest;
import com.proclassroom.proclassroom.dto.SigninRequest;
import com.proclassroom.proclassroom.dto.SingnUpRequset;
import com.proclassroom.proclassroom.model.User;

public interface AuthenticationService {

    User singnup(SingnUpRequset singnUpRequset);

    JwtAuthenticationResponse singin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

    // String login(LoginRequest loginRequest);
}
