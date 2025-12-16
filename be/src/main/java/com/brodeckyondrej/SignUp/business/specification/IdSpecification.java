package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity_;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class IdSpecification {
    public static<T extends BaseEntity> Specification<T> hasId(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.disjunction();
            }

            return cb.equal(root.get(BaseEntity_.id), id);
        };
    }
}
