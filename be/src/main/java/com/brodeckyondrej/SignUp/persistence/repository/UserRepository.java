package com.brodeckyondrej.SignUp.persistence.repository;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserRepository extends NamedEntityRepository<User> {

    Page<User> findByNameContainingIgnoreCaseAndRole(String name, UserRole role, Pageable pageable);

    Page<User> findByRole(UserRole role, Pageable pageable);
}
