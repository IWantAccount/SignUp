package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.business.specification.PrivateCollectionSpecification;
import com.brodeckyondrej.SignUp.business.specification.SubjectSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
//Pomáhal mi psát ChatGPT (model 5.2 od OpenAI)
@Component("authHelper")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthHelperService {
    private final PrivateCollectionRepository collectionRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;

    public boolean isAdminOrCollectionOwner(UUID collectionId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UserDetailExtractor)) {
            return false;
        }

        UserDetailExtractor userDetailExtractor = (UserDetailExtractor) auth.getPrincipal();

        if(isAdmin(userDetailExtractor)) {
            return true;
        }

        Specification<PrivateCollection> specs = new SpecificationBuilder<PrivateCollection>()
                .addSpec(PrivateCollectionSpecification.hasId(collectionId))
                .addSpec(PrivateCollectionSpecification.hasOwner(userDetailExtractor.getId()))
                .build();

        return collectionRepository.exists(specs);

    }

    public boolean atLeastTeacherOrSelf(UUID studentId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UserDetailExtractor)) {
            return false;
        }

        UserDetailExtractor userDetailExtractor = (UserDetailExtractor) auth.getPrincipal();

        if(atLeastTeacher(userDetailExtractor)) {
            return true;
        }

        return userDetailExtractor.getId().equals(studentId);
    }

    private boolean isAdmin(UserDetailExtractor userDetailExtractor) {
        return userDetailExtractor.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    private boolean atLeastTeacher(UserDetailExtractor userDetailExtractor) {
        if(isAdmin(userDetailExtractor)) {
            return true;
        }
        return userDetailExtractor.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_TEACHER"));
    }
}
