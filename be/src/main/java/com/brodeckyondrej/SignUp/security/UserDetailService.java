package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("Uživatel s emailem " + username + " nenalezen"));


        return new UserDetailExtractor(user);
    }

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
