package com.brodeckyondrej.SignUp.DbEntity.Subject.Service;

import com.brodeckyondrej.SignUp.DbEntity.Subject.Dto.*;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRepository;
import com.brodeckyondrej.SignUp.DbEntity.User.UserRole;
import com.brodeckyondrej.SignUp.Exception.ValidationException;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SubjectService extends NamedEntityService<Subject, CreateSubjectDto, UpdateSubjectDto, SubjectGetDetailDto, SubjectGetListDto> {

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
