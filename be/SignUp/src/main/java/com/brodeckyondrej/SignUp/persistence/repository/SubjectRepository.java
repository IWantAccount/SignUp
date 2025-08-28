package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends NamedEntityRepository<Subject> {
}
