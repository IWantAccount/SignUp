package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends NamedEntityRepository<Category> {
    Page<Category> findBySubject(Subject subject, Pageable pageable);
}
