package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import org.springframework.data.jpa.domain.Specification;

public class SignComponentSpecification extends IdSpecification {
    public static Specification<SignComponent> hasType(SignComponentType type) {
        return (root, query, cb )-> cb.equal(root.get("type"), type);
    }

    public static Specification<SignComponent> hasDescriptionLike(String description) {
        return (root, query, cb) -> {
            if( description.isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(cb.lower(root.get("textDescription")), "%"+description.toLowerCase()+"%");
        };
    }
}
