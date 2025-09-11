package com.brodeckyondrej.SignUp;

import com.brodeckyondrej.SignUp.config.StorageProperties;
import com.brodeckyondrej.SignUp.config.VideoProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({VideoProperties.class, StorageProperties.class})
public class SignUpApplication {

	public static void main(String[] args) {
		SpringApplication.run(SignUpApplication.class, args);
	}

}
