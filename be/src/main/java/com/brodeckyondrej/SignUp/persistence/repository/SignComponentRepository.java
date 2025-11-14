package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface SignComponentRepository extends EntityRepository<SignComponent> {
    Page<SignComponent> findByType(SignComponentType type, Pageable pageable);
    Page<SignComponent> findByTypeAndTextDescriptionContainingIgnoreCase(SignComponentType type, String textDescription, Pageable pageable);
    Page<SignComponent> findByTextDescriptionContainingIgnoreCase(String textDescription, Pageable pageable);
}
