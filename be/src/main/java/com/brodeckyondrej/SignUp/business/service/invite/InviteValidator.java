package com.brodeckyondrej.SignUp.business.service.invite;

import com.brodeckyondrej.SignUp.business.dto.invite.InviteCreateDto;
import com.brodeckyondrej.SignUp.business.dto.invite.InviteUpdateDto;
import com.brodeckyondrej.SignUp.business.service.universal.Validator;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InviteValidator implements Validator<InviteCreateDto, InviteUpdateDto> {
    @Override
    public void validateCreateOrThrow(InviteCreateDto inviteCreateDto) {

    }

    @Override
    public void validateUpdateOrThrow(UUID originalId, InviteUpdateDto inviteUpdateDto) {

    }
}
