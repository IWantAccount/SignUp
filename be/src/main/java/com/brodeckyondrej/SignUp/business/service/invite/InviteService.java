package com.brodeckyondrej.SignUp.business.service.invite;

import com.brodeckyondrej.SignUp.business.dto.invite.*;
import com.brodeckyondrej.SignUp.business.dto.user.UserCreateDto;
import com.brodeckyondrej.SignUp.business.dto.user.UserGetDetailDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.business.service.user.UserService;
import com.brodeckyondrej.SignUp.persistence.entity.Invite;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.InviteRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class InviteService extends EntityService<Invite, InviteCreateDto, InviteUpdateDto, InviteGetDetailDto, InviteGetListDto> {
    private final InviteRepository inviteRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public InviteService(InviteRepository inviteRepository, InviteValidator validator, InviteMapper mapper, UserService userService, UserRepository userRepository) {
        super(inviteRepository, validator, mapper);
        this.inviteRepository = inviteRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public InviteGetDetailDto ProcessInvite(ProcessInviteDto processInviteDto, UUID id){
        Invite invite = inviteRepository.findByIdOrThrow(id);
        if(invite.getUsedAt() != null){
            throw new IllegalStateException("Opětovné použití pozvánky");
        }

        UserCreateDto userCreateDto = new UserCreateDto(processInviteDto.getName(), processInviteDto.getEmail(), processInviteDto.getEmail(), invite.getRole());
        UserGetDetailDto createdUserDto = this.userService.create(userCreateDto);
        User createdUser = this.userRepository.findByIdOrThrow(createdUserDto.getId());

        invite.setCreatedUser(createdUser);
        invite.setUsedAt(Instant.now());

        return mapper.toDetailDto(invite);
    }

}
