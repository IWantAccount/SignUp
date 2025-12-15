package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserUpdateDto extends NamedDto {
    @NotBlank
    private final String email;

    @NotNull
    private final UserRole role;

    public UserUpdateDto(String name, String email, UserRole role) {
        super(name);
        this.email = email;
        this.role = role;
    }
}
