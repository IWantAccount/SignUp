package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetListDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
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
