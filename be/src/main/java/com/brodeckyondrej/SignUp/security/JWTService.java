package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.config.JWTConfig;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {

    private final JWTConfig config;

    public JWTService(JWTConfig config) {
        this.config = config;
    }

    public String createJWT(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + config.validInMinutes() * 1000 * 60))
                .and()
                .signWith(getPrivateKey())
                .compact();
    }

    private Key getPrivateKey() {
        return Keys.hmacShaKeyFor(config.secret().getBytes());
    }

}
