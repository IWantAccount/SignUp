package com.brodeckyondrej.SignUp.business.service.subject;

import com.brodeckyondrej.SignUp.business.dto.subject.*;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.business.specification.NameSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.entity.Subject;
import com.brodeckyondrej.SignUp.persistence.entity.User;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.repository.SubjectRepository;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SubjectService extends NamedEntityService<Subject, SubjectCreateDto, SubjectUpdateDto, SubjectGetDetailDto, SubjectGetListDto> {

    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;
    private final ClassroomRepository classroomRepository;

    public SubjectService(SubjectRepository repository, SubjectValidator validator, SubjectMapper mapper,
                          UserRepository userRepository, ClassroomRepository classroomRepository) {
        super(repository, validator, mapper);
        this.subjectRepository = repository;
        this.userRepository = userRepository;
        this.classroomRepository = classroomRepository;
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

    public void addClassroom(SubjectClassroomDto dto){
        Classroom classroom = classroomRepository.findByIdOrThrow(dto.getClassroomId());
        Subject subject = subjectRepository.findByIdOrThrow(dto.getSubjectId());

        classroom.getStudents().forEach(subject::addStudent);
    }

    public Page<SubjectGetListDto> search(FindByNameDto dto, Pageable pageable) {
        Specification<Subject> spec = new SpecificationBuilder<Subject>()
                .addSpecIfNotNull(NameSpecification.hasNameLike(dto.getName()), dto.getName())
                .build();

        return subjectRepository.findAll(spec, pageable).map(mapper::toListDto);
    }
}
