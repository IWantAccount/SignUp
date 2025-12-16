package com.brodeckyondrej.SignUp.business.specification;
import com.brodeckyondrej.SignUp.persistence.entity.Category;
import com.brodeckyondrej.SignUp.persistence.entity.Category_;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import org.springframework.data.jpa.domain.Specification;

public class CategorySpecification extends NameSpecification{
    public static Specification<Category> hasSubject(Subject subject) {
        return (root, query, cb) -> cb.equal(root.get(Category_.subject), subject);
    }
}
