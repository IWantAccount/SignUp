package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import java.util.UUID;

@NoRepositoryBean
public interface EntityRepository<Entity extends BaseEntity> extends JpaRepository<Entity, UUID> {
    default Entity findByIdOrThrow(UUID id){
        return findById(id).orElseThrow(() -> new MissingObjectException(""));
    }
}
