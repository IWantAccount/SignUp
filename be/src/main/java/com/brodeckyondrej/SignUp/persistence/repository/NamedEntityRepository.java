package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import org.springframework.data.repository.NoRepositoryBean;
import java.util.List;

@NoRepositoryBean
public interface NamedEntityRepository<Entity extends NamedEntity> extends EntityRepository<Entity> {
    //TODO replace with fulltext search
    List<Entity> findByName(String name);
}
