package com.brodeckyondrej.SignUp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.unit.DataSize;
import java.util.Set;

@ConfigurationProperties(prefix = "video")
public record VideoProperties(DataSize maxSize, Set<String> allowedTypes) {
}
