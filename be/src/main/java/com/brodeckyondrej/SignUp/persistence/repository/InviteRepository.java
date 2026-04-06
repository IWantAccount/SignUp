package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Invite;
import com.brodeckyondrej.SignUp.persistence.entity.User;

import java.util.Optional;

public interface InviteRepository extends EntityRepository<Invite>{
    public Optional<Invite> findByCreatedUser(User user);
}
