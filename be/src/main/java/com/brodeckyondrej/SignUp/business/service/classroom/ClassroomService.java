package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class ClassroomService extends NamedEntityService<Classroom, ClassroomCreateDto, ClassroomUpdateDto, ClassroomGetDetailDto, ClassroomGetListDto> {

    private final ClassroomRepository classroomRepository;

    public ClassroomService(ClassroomRepository repository, ClassroomValidator validator, ClassroomMapper mapper ) {
        super(repository, validator, mapper);
        this.classroomRepository = repository;
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
