package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.business.specification.NameSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;
import java.util.List;

@Service
@Transactional
public class ClassroomService extends NamedEntityService<Classroom, ClassroomCreateDto, ClassroomUpdateDto, ClassroomGetDetailDto, ClassroomGetListDto> {

    private final ClassroomRepository classroomRepository;
    private final ClassroomMapper classroomMapper;

    public ClassroomService(ClassroomRepository repository, ClassroomValidator validator, ClassroomMapper classroomMapper) {
        super(repository, validator, classroomMapper);
        this.classroomRepository = repository;
        this.classroomMapper = classroomMapper;
    }

    public Page<ClassroomGetListDto> search(FindByNameDto dto, Pageable pageable) {
        Specification<Classroom> specification = new SpecificationBuilder<Classroom>()
                .addSpecIfNotNull(NameSpecification.hasNameLike(dto.getName()), dto.getName())
                .build();
        return classroomRepository.findAll(specification, pageable).map(classroomMapper::toListDto);
    }

    @Override
    public void delete(UUID id) {
        Classroom classroom = classroomRepository.findByIdOrThrow(id);

        classroom.getStudents().forEach(student -> {
            student.setClassroom(null);
        });
        super.delete(id);
    }


}
