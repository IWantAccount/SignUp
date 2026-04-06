package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.invite.*;
import com.brodeckyondrej.SignUp.business.service.invite.InviteService;
import com.brodeckyondrej.SignUp.persistence.entity.Invite;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastAdmin;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/invite")
public class InviteController extends EntityController<Invite, InviteCreateDto, InviteUpdateDto, InviteGetDetailDto, InviteGetListDto> {
    private final InviteService inviteService;

    public InviteController(InviteService service){
        super(service);
        this.inviteService = service;
    }

    @Override
    @PostMapping()
    @AtLeastAdmin
    public ResponseEntity<InviteGetDetailDto> create(@Valid @RequestBody InviteCreateDto inviteCreateDto) {
        return super.create(inviteCreateDto);
    }

    @Override
    @PostMapping("/{id}")
    @AtLeastAdmin
    public ResponseEntity<InviteGetDetailDto> update(@Valid @RequestBody InviteUpdateDto inviteUpdateDto, @PathVariable UUID id) {
        return super.update(inviteUpdateDto, id);
    }

    @Override
    @DeleteMapping("/{id}")
    @AtLeastAdmin
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return super.delete(id);
    }

    @PostMapping("/{id}/process")
    public ResponseEntity<InviteGetDetailDto> process(@PathVariable UUID id, @Valid @RequestBody ProcessInviteDto processInviteDto) {
        return ResponseEntity.ok(inviteService.ProcessInvite(processInviteDto, id));
    }
}
