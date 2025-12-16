package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;
@NoRepositoryBean
public interface NamedEntityRepository<Entity extends NamedEntity> extends EntityRepository<Entity> {
    Page<Entity> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existsByName(String name);
}
