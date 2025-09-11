package com.brodeckyondrej.SignUp.business.dto.collection;

import com.brodeckyondrej.SignUp.business.dto.user.UserGetListDto;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
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
