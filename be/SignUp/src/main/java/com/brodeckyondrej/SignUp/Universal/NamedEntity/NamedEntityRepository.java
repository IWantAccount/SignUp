package com.brodeckyondrej.SignUp.Universal.NamedEntity;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.EntityRepository;
import org.springframework.data.repository.NoRepositoryBean;
import java.util.List;

@NoRepositoryBean
public interface NamedEntityRepository<Entity extends NamedEntity> extends EntityRepository<Entity> {
    //TODO replace with fulltext search
    List<Entity> findByName(String name);
}
