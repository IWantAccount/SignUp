package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import com.brodeckyondrej.SignUp.persistence.repository.PrivateCollectionRepository;
import lombok.RequiredArgsConstructor;
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

    public boolean isAdminOrCollectionOwner(UUID collectionId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof UserDetailExtractor)) {
            return false;
        }

        UserDetailExtractor userDetailExtractor = (UserDetailExtractor) auth.getPrincipal();

        if(isAdmin(userDetailExtractor)) {
            return true;
        }

        PrivateCollection foundCollection = collectionRepository.findByIdOrThrow(collectionId);

        return foundCollection.getOwner().getId().equals(userDetailExtractor.getId());

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
