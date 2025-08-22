package com.brodeckyondrej.SignUp.DbEntity.User.Dto;

import com.brodeckyondrej.SignUp.DbEntity.User.UserRole;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDto;
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
