package com.brodeckyondrej.SignUp.DbEntity.SignComponent;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.EntityRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface SignComponentRepository extends EntityRepository<SignComponent> {
    public List<SignComponent> findByType(SignComponentType type);
}
