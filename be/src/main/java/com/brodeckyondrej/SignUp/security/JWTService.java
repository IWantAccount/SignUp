package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.config.JWTConfig;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

//Tady jsem velkou část kódu převzal z https://www.youtube.com/watch?v=oeni_9g7too
@Service
public class JWTService {

    private final JWTConfig config;

    public JWTService(JWTConfig config) {
        this.config = config;
    }

    public String createJWT(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("userId", user.getId());
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

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String emailInJwt = extractEmail(token);
        return emailInJwt.equals(userDetails.getUsername()) && !isExpired(token);
    }

    private SecretKey getPrivateKey() {
        return Keys.hmacShaKeyFor(config.secret().getBytes());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getPrivateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private  <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private boolean isExpired(String token) {
        Date expiredAt = extractClaim(token, Claims::getExpiration);
        return expiredAt.before(new Date());
    }
}
