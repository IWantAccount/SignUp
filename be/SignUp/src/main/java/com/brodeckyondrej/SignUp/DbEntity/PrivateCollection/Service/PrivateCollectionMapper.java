package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Service;

import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionCreateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.Dto.PrivateCollectionUpdateDto;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.PrivateCollection;
import com.brodeckyondrej.SignUp.DbEntity.User.Service.UserMapper;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRepository;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
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
}
