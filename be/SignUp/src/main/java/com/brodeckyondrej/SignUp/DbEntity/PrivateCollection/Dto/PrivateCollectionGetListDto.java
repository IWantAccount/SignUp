package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto;

import com.brodeckyondrej.SignUp.DbEntity.User.Dto.UserGetListDto;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.UUID;

@Getter
public class PrivateCollectionGetListDto extends NamedDtoWithId {
    private final UserGetListDto owner;

    public PrivateCollectionGetListDto(UUID id, UserGetListDto owner, String name){
        super(owner.getId(), name);
        this.owner = owner;
    }
}
