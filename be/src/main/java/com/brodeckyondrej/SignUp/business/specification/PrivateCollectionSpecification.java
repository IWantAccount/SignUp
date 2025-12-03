package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection_;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

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
}
