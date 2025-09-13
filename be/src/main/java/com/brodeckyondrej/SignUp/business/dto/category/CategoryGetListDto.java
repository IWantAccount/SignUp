package com.brodeckyondrej.SignUp.business.dto.category;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class CategoryGetListDto extends NamedDtoWithId {
    private final int numberOfSigns;
    private final NamedDtoWithId subjectNameId;

    public CategoryGetListDto(UUID id, String name, int numberOfSigns, NamedDtoWithId subjectNameId) {
        super(id, name);
        this.numberOfSigns = numberOfSigns;
        this.subjectNameId = subjectNameId;
    }
}
