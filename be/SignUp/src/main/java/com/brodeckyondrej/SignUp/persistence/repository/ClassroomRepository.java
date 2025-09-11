package com.brodeckyondrej.SignUp.persistence.repository;

import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends NamedEntityRepository<Classroom> {
}
