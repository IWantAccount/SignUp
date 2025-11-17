package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SignRepository extends EntityRepository<Sign> {
    Page<Sign> findByCategory(Category category, Pageable pageable);

    Page<Sign> findDistinctByInPrivateCollectionsContains(PrivateCollection privateCollection, Pageable pageable);

    @Query("""
                select distinct s
                from Sign s join s.translations t
                    where lower(t) like lower((concat('%', :search, '%')))
            """)
    Page<Sign> findByTranslation(@Param("search") String search, Pageable pageable);

    @Query("""
            select distinct s
            from Sign s join s.translations t
                where lower(t) like lower((concat('%', :search, '%')))
                    and s.category = :category
            """)
    Page<Sign> findByTranslationAndCategory(@Param("search") String search, @Param("category") Category category, Pageable pageable);

    @Query("""
           select distinct s
           from Sign s join s.translations t join s.inPrivateCollections pc
                where lower(t) like lower((concat('%', :search, '%')))
                           and pc = :privateCollection
           """)
    Page<Sign> findByTranslationAndPrivateCollection(@Param("search") String search, @Param("privateCollection") PrivateCollection privateCollection, Pageable pageable);
}
