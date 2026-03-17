package com.brodeckyondrej.SignUp.business.dto.invite;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProcessInviteDto {
    private final String name;
    private final String email;
    private final String password;
}
