package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface SignComponentRepository extends EntityRepository<SignComponent> {
    public List<SignComponent> findByType(SignComponentType type);
}
