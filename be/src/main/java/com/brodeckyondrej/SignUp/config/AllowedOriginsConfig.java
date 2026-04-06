package com.brodeckyondrej.SignUp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "origins")
public record AllowedOriginsConfig(List<String> allowed){
}
