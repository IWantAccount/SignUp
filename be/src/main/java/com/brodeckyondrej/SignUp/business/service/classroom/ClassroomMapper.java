package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.business.specification.UserSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import com.brodeckyondrej.SignUp.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassroomMapper implements EntityMapper<Classroom, ClassroomCreateDto, ClassroomUpdateDto, ClassroomGetDetailDto, ClassroomGetListDto> {

    private final UserRepository userRepository;

    @Override
    public Classroom fromCreateDto(ClassroomCreateDto inputClassroomDto) {
        return new Classroom(inputClassroomDto.getName());
    }

    @Override
    public void updateFromDto(Classroom entity, ClassroomUpdateDto inputClassroomDto) {
        entity.setName((inputClassroomDto.getName()));
    }

    @Override
    public ClassroomGetDetailDto toDetailDto(Classroom entity) {
        return new ClassroomGetDetailDto(entity.getId(), entity.getName());
    }

    @Override
    public ClassroomGetListDto toListDto(Classroom entity) {
        long studentCount = userRepository.count(UserSpecification.isInClassroom(entity));
        return new ClassroomGetListDto(entity.getId(), entity.getName(), studentCount);
    }
}
