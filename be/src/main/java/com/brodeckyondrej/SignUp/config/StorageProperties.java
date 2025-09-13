package com.brodeckyondrej.SignUp.config;

import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.nio.file.Path;

@Validated
@ConfigurationProperties(prefix = "storage")
public record StorageProperties(@NotNull Path location) {
}
