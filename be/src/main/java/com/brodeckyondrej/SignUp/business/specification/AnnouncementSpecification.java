package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.entity.Announcement;
import com.brodeckyondrej.SignUp.persistence.entity.Announcement_;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;

public class AnnouncementSpecification extends IdSpecification{
    public static Specification<Announcement> isNewerThan(Instant compare) {
        return (root, query, cb) -> cb.greaterThan(root.get(Announcement_.createdAt), compare);
    }
}
