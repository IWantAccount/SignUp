package com.brodeckyondrej.SignUp.security.annotations;

import com.brodeckyondrej.SignUp.security.UserDetailExtractor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("authHelper")
public class AuthHelper {
    public boolean adminOrSelf(Authentication authentication, UUID idToCompare) {
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals("ADMIN"));
        if (isAdmin) {
            return true;
        }

        UserDetailExtractor principal = (UserDetailExtractor) authentication.getPrincipal();
        return principal.getId().equals(idToCompare);
    }
}
