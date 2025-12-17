package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.SubjectCreateDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectGetListDto;
import com.brodeckyondrej.SignUp.business.dto.subject.SubjectUpdateDto;
import com.brodeckyondrej.SignUp.business.specification.CategorySpecification;
import com.brodeckyondrej.SignUp.business.specification.UserSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.persistence.repository.CategoryRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectMapper implements EntityMapper<Subject, SubjectCreateDto, SubjectUpdateDto, SubjectGetDetailDto, SubjectGetListDto> {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Subject fromCreateDto(SubjectCreateDto subjectCreateDto) {
        return new Subject(subjectCreateDto.getName());
    }

    @Override
    public void updateFromDto(Subject entity, SubjectUpdateDto subjectUpdateDto) {
        entity.setName(subjectUpdateDto.getName());
    }

    @Override
    public SubjectGetDetailDto toDetailDto(Subject entity) {
        return new SubjectGetDetailDto(entity.getId(), entity.getName());
    }

    @Override
    public SubjectGetListDto toListDto(Subject entity) {
        long categoryCount = categoryRepository.count(CategorySpecification.hasSubject(entity));
        long studentCount = userRepository.count(UserSpecification.isInSubject(entity));
        return new SubjectGetListDto(entity.getId(), entity.getName(), studentCount, categoryCount);
    }
}
