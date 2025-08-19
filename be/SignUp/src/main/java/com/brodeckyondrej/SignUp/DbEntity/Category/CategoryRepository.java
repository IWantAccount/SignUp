package com.brodeckyondrej.SignUp.DbEntity.Category;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends NamedEntityRepository<Category> {
    Page<Category> findBySubject(Subject subject, Pageable pageable);
}
