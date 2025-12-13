package com.brodeckyondrej.SignUp.config;

import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "jwt")
public record JWTConfig (@NotNull String secret, @NotNull long validInMinutes) {
}
