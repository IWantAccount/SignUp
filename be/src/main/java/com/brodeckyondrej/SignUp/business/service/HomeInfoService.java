package com.brodeckyondrej.SignUp.business.service;

import com.brodeckyondrej.SignUp.business.dto.HomeInfoDto;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class HomeInfoService {
    private final UserRepository userRepository;
    private final SignRepository signRepository;
    private final SubjectRepository subjectRepository;
    private final CategoryRepository categoryRepository;

    public HomeInfoDto getHomeInfo() {
        return new HomeInfoDto(userRepository.count(), signRepository.count(),
                subjectRepository.count(), categoryRepository.count());
    }
}
