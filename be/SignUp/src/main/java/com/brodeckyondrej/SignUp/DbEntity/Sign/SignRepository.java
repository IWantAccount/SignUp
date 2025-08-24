package com.brodeckyondrej.SignUp.DbEntity.Sign;

import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.PrivateCollection;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.EntityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SignRepository extends EntityRepository<Sign> {
    Page<Sign> findByCategory(Category category, Pageable pageable);
    Page<Sign> findDistinctByInPrivateCollectionsContains(PrivateCollection privateCollection, Pageable pageable);
}
