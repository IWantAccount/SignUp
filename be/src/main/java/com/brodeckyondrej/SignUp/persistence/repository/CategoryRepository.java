package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Category;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends NamedEntityRepository<Category> {
}
