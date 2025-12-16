package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.Subject_;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public class SubjectSpecification extends NameSpecification{
    public static Specification<Subject> hasStudent(User student) {
        return (root, query, cb) -> {
            if(student == null) {
                return cb.disjunction();
            }

            Expression<Set<User>> users = root.get(Subject_.students);
            return cb.isMember(student, users);
        };
    }
}
