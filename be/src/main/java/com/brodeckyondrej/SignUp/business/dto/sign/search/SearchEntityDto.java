package com.brodeckyondrej.SignUp.business.dto.sign.search;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class SearchEntityDto {

    private final String search;

    @NotNull
    private UUID entityId;
}
