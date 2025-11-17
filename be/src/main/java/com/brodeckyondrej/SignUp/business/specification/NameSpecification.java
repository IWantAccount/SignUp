package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import org.springframework.data.jpa.domain.Specification;

public class NameSpecification {
    public static<T extends NamedEntity> Specification<T> hasNameLike(String name) {
        return (root, query, cb) -> {
            if( name.isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(root.get("name"), "%" + name + "%");
        };
    }
}
