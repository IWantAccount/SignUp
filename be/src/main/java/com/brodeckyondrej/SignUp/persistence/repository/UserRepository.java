package com.brodeckyondrej.SignUp.persistence.repository;
import com.brodeckyondrej.SignUp.persistence.entity.User;

import java.util.Optional;


public interface UserRepository extends NamedEntityRepository<User> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
}
