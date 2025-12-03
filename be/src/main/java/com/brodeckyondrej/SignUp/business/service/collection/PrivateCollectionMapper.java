package com.brodeckyondrej.SignUp.business.service.collection;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.business.service.user.UserMapper;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class PrivateCollectionMapper implements EntityMapper<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto
        > {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public PrivateCollectionMapper(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public PrivateCollection fromCreateDto(PrivateCollectionCreateDto privateCollectionCreateDto) {
        User owner = userRepository.findByIdOrThrow(privateCollectionCreateDto.getOwnerId());

        return new PrivateCollection(owner, privateCollectionCreateDto.getName());
    }

    @Override
    public void updateFromDto(PrivateCollection entity, PrivateCollectionUpdateDto privateCollectionUpdateDto) {
        entity.setName(privateCollectionUpdateDto.getName());
    }

    @Override
    public PrivateCollectionGetDetailDto toDetailDto(PrivateCollection entity) {
        return new PrivateCollectionGetDetailDto(
                entity.getId(),
                userMapper.toListDto(entity.getOwner()),
                entity.getName()
        );
    }

    @Override
    public PrivateCollectionGetListDto toListDto(PrivateCollection entity) {
        return new PrivateCollectionGetListDto(
                entity.getId(),
                userMapper.toListDto(entity.getOwner()),
                entity.getName()
        );
    }

    public SignInCollectionDto toSignInCollectionDto(PrivateCollection collection, Sign sign) {
        boolean inCollection = collection.getSigns().contains(sign);
        return new SignInCollectionDto(sign.getId(), collection.getName(), collection.getId(), inCollection);
    }
}
