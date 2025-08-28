package com.brodeckyondrej.SignUp.persistence.entity;

import com.brodeckyondrej.SignUp.persistence.repository.NamedEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends NamedEntityRepository<Classroom> {
}
