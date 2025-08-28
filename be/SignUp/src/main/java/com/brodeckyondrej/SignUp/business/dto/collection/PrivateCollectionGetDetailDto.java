package com.brodeckyondrej.SignUp.business.dto.collection;

import com.brodeckyondrej.SignUp.business.dto.user.UserGetListDto;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PrivateCollectionGetDetailDto extends NamedDtoWithId {
    private final UserGetListDto owner;

    public PrivateCollectionGetDetailDto(UUID id,  UserGetListDto owner, @NotNull String name){
        super(id, name);
        this.owner = owner;
    }
}
