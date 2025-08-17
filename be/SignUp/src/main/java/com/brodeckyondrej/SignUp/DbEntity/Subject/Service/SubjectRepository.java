package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends NamedEntityRepository<Subject> {
}
