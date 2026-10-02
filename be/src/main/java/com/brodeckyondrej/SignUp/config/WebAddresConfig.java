package com.brodeckyondrej.SignUp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "web-origin")
public record WebAddresConfig (String webAddress) {
}
