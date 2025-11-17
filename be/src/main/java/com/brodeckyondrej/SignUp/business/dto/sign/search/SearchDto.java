package com.brodeckyondrej.SignUp.business.dto.sign.search;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchDto {
    @NotNull
    private final String search;
}
