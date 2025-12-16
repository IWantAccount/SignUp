package com.brodeckyondrej.SignUp.security;

import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//částečně převzato z https://www.youtube.com/watch?v=oeni_9g7too
@Service
public class UserDetailServiceSpec implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username).orElseThrow(() ->
                new UsernameNotFoundException("Uživatel se jménem " + username + " nenalezen"));


        return new UserDetailExtractor(user);
    }

    public UserDetailServiceSpec(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
