package com.proclassroom.proclassroom.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;

    // ✅ added for frontend use
    private int userId;
    private String role;
}
