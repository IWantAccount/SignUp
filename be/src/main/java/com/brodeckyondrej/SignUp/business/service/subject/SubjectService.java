package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.*;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SubjectService extends NamedEntityService<Subject, SubjectCreateDto, SubjectUpdateDto, SubjectGetDetailDto, SubjectGetListDto> {

    private final SubjectRepository subjectRepository;
    private final SubjectValidator subjectValidator;
    private final SubjectMapper subjectMapper;
    private final UserRepository userRepository;

    public SubjectService(SubjectRepository repository, SubjectValidator validator, SubjectMapper mapper, UserRepository userRepository) {
        super(repository, validator, mapper);
        this.subjectRepository = repository;
        this.subjectValidator = validator;
        this.subjectMapper = mapper;
        this.userRepository = userRepository;
    }

    public void addStudent(SubjectStudentDto dto){
        Subject subject = subjectRepository.findByIdOrThrow(dto.getSubjectId());
        User student = userRepository.findByIdOrThrow(dto.getStudentId());

        if(!student.getRole().equals(UserRole.STUDENT)){
            throw new ValidationException("Uživatel s id " + student.getId() + " není student");
        }

        subject.addStudent(student);
    }

    public void removeStudent(SubjectStudentDto dto){
        Subject subject = subjectRepository.findByIdOrThrow(dto.getSubjectId());
        User student = userRepository.findByIdOrThrow(dto.getStudentId());

        if(!student.getRole().equals(UserRole.STUDENT)){
            throw new ValidationException("Uživatel s id " + student.getId() + " není student");
        }

        subject.removeStudent(student);
    }
}
