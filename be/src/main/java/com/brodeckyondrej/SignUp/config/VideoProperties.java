package com.brodeckyondrej.SignUp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.unit.DataSize;
import java.util.List;

@ConfigurationProperties(prefix = "video")
public record VideoProperties(DataSize maxSize, List<String> allowedTypes) {
}
