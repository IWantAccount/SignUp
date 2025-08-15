package com.brodeckyondrej.SignUp.AbstractEntity;

import com.brodeckyondrej.SignUp.Exception.MissingObjectException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EntityRepository<Entity extends BaseEntity> extends JpaRepository<Entity, UUID> {
    default Entity findByIdOrThrow(UUID id){
        return findById(id).orElseThrow(() -> new MissingObjectException(""));
    }
}
