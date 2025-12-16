package com.brodeckyondrej.SignUp.util;

import com.brodeckyondrej.SignUp.business.dto.user.UserCreateDto;
import com.brodeckyondrej.SignUp.business.service.user.UserService;
import com.brodeckyondrej.SignUp.config.InitUserConfig;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//Inspiroval jsem se tady https://www.baeldung.com/running-setup-logic-on-startup-in-spring
@Component
@AllArgsConstructor
public class CreateUserOnStart implements CommandLineRunner {
    private final UserService userService;
    private final UserRepository userRepository;
    private final InitUserConfig initUserConfig;

    @Override
    public void run(String... args) {
        if(initUserConfig.enabled() && !userRepository.existsByName(initUserConfig.name())) {
            UserCreateDto createDto = new UserCreateDto(
                    initUserConfig.name(), initUserConfig.password(), initUserConfig.email(), UserRole.ADMIN);
            userService.create(createDto);
        }
    }
}
