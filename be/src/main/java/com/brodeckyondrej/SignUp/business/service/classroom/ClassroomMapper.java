package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomUpdateDto;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomGetListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.ClassroomCreateDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class ClassroomMapper implements EntityMapper<Classroom, ClassroomCreateDto, ClassroomUpdateDto, ClassroomGetDetailDto, ClassroomGetListDto> {


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
        return new ClassroomGetListDto(entity.getId(), entity.getName(), entity.getStudents().size());
    }
}
