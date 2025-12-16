package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.*;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;
import java.util.UUID;

public class PrivateCollectionSpecification extends NameSpecification {
    public static Specification<PrivateCollection> containsSign(Sign sign) {
        return (root, query, cb) -> {
            if(sign == null) {
                return cb.conjunction();
            }

            Expression<Set<Sign>> signs = root.get(PrivateCollection_.signs);
            return cb.isMember(sign, signs);
        };
    }

    public static Specification<PrivateCollection> hasOwner(User user) {
        return (root, query, cb) -> {
            if(user == null) {
                return cb.disjunction();
            }

            return cb.equal(root.get(PrivateCollection_.owner), user);
        };
    }

    public static Specification<PrivateCollection> hasOwner(UUID ownerId) {
        return (root, query, cb) -> {
            if(ownerId == null) {
                return cb.disjunction();
            }

            return cb.equal(root
                    .get(PrivateCollection_.owner)
                    .get(User_.id), ownerId);
        };
    }
}
