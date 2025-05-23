
package com.proclassroom.proclassroom.service;

import java.util.Map;
import org.springframework.security.core.userdetails.UserDetails;

public interface JWTservice {

    String extractUsername(String token); // fixed typo

    String generateToken(UserDetails user); // fixed type

    boolean isTokenValid(String token, UserDetails userDetails); // fixed typo

    String generateRefreshToken(Map<String, Object> extraClaims, UserDetails user); // fixed type and typo
}
