package com.brodeckyondrej.SignUp.config;

import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "init-user")
public record InitUserConfig (@NotNull String name, @NotNull String email, @NotNull String password, @NotNull Boolean enabled) {
}
