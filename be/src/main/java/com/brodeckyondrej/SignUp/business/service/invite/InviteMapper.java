package com.brodeckyondrej.SignUp.business.service.invite;

import com.brodeckyondrej.SignUp.business.dto.invite.InviteCreateDto;
import com.brodeckyondrej.SignUp.business.dto.invite.InviteGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.invite.InviteGetListDto;
import com.brodeckyondrej.SignUp.business.dto.invite.InviteUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.business.service.user.UserMapper;
import com.brodeckyondrej.SignUp.persistence.entity.Invite;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InviteMapper implements EntityMapper<Invite, InviteCreateDto, InviteUpdateDto, InviteGetDetailDto, InviteGetListDto> {
    private final UserMapper userMapper;

    @Override
    public Invite fromCreateDto(InviteCreateDto inviteCreateDto) {
        return new Invite(inviteCreateDto.getRole(), null, null);
    }

    @Override
    public void updateFromDto(Invite entity, InviteUpdateDto inviteUpdateDto) {
        entity.setRole(inviteUpdateDto.getRole());
    }

    @Override
    public InviteGetDetailDto toDetailDto(Invite entity) {
        return new InviteGetDetailDto(
                entity.getId(),
                entity.getRole(),
                entity.getUsedAt(),
                entity.getCreatedUser() == null ? null : userMapper.toListDto(entity.getCreatedUser())
        );
    }

    @Override
    public InviteGetListDto toListDto(Invite entity) {
        return new InviteGetListDto(
                entity.getId(),
                entity.getRole(),
                entity.getUsedAt(),
                entity.getCreatedUser() == null ? null : userMapper.toListDto(entity.getCreatedUser())
        );
    }
}
