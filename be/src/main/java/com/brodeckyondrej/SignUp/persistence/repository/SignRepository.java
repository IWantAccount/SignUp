package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SignRepository extends EntityRepository<Sign> {
    Page<Sign> findByCategory(Category category, Pageable pageable);
    Page<Sign> findDistinctByInPrivateCollectionsContains(PrivateCollection privateCollection, Pageable pageable);
}
