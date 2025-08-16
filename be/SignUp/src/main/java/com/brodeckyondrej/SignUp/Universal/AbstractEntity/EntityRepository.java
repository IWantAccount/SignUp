package com.brodeckyondrej.SignUp.Universal.AbstractEntity;

import com.brodeckyondrej.SignUp.Exception.MissingObjectException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import java.util.UUID;

@NoRepositoryBean
public interface EntityRepository<Entity extends BaseEntity> extends JpaRepository<Entity, UUID> {
    default Entity findByIdOrThrow(UUID id){
        return findById(id).orElseThrow(() -> new MissingObjectException(""));
    }
}
