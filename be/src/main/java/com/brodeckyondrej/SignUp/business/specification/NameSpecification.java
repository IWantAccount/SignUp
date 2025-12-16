package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity_;
import org.springframework.data.jpa.domain.Specification;

public class NameSpecification extends IdSpecification{
    public static<T extends NamedEntity> Specification<T> hasNameLike(String name) {
        return (root, query, cb) -> {
            if( name.isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(cb.lower(root.get(NamedEntity_.name)), "%" + name.toLowerCase() + "%");
        };
    }
}
