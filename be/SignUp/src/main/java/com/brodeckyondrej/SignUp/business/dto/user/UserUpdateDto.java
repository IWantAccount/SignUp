package com.brodeckyondrej.SignUp.business.dto.user;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import lombok.Getter;

@Getter
public class UserUpdateDto extends NamedDto {
    private final String password;
    private final String email;
    private final UserRole role;

    public UserUpdateDto(String name, String password, String email, UserRole role) {
        super(name);
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
