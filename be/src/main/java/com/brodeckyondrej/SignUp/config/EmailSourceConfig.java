package com.brodeckyondrej.SignUp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix= "mail")
public record EmailSourceConfig (String emailSource) {
}
