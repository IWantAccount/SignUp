package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom_;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public class ClassroomSpecification extends NameSpecification {
    public static Specification<Classroom> hasStudent(User student) {
        return (root, query, cb) -> {
            if (student == null) {
                return cb.disjunction();
            }

            Expression<Set<User>> students = root.get(Classroom_.students);
            return cb.isMember(student, students);
        };
    }
}
