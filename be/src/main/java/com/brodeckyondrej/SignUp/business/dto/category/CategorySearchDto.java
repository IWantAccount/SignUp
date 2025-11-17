package com.brodeckyondrej.SignUp.business.dto.category;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class CategorySearchDto {
    private UUID subjectId;
    private String name;
}
