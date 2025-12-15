package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserCreateDto extends NamedDto {
    @NotBlank(message = "Heslo je povinné")
    @Size(min = 6, message = "Heslo musí mít alespoň 6 znaků")
    private final String password;
    @NotBlank
    private final String email;
    @NotNull
    private final UserRole role;

    public UserCreateDto(String name, String password, String email, UserRole role) {
        super(name);
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
