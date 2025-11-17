package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public class UserSpecification extends NameSpecification {
    public static Specification<User> hasNameLike(String name) {
        return NameSpecification.hasNameLike(name);
    }
    public static Specification<User> hasEmailLike(String email) {
        return (root, query, cb) -> {
            if(email.isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(cb.lower(root.get("email")), "%" + email.toLowerCase() + "%");
        };
    }

    public static Specification<User> hasRole(UserRole role) {
        return (root, query, cb) -> cb.equal(root.get("role"), role);
    }

    public static Specification<User> isInClassroom(Classroom classroom) {
        return (root, query, cb) -> cb.equal(root.get("classroom"), classroom);
    }

    public static Specification<User> isInSubject(Subject subject) {
        return (root, query, cb) -> {
            Expression<Set<Subject>> subjects = root.get("subjects");
            return cb.isMember(subject, subjects);
        };
    }
}
