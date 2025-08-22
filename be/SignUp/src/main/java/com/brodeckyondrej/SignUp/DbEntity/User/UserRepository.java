package com.brodeckyondrej.SignUp.DbEntity.User;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends NamedEntityRepository<User> {
    Page<User> findByClassroom(Classroom classroom, Pageable pageable);
    Page<User> findBySubjects(Subject subject, Pageable pageable);
}
