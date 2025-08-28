package com.brodeckyondrej.SignUp.business.service.classroom;

import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomListDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.InputClassroomDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class ClassroomMapper implements EntityMapper<Classroom, InputClassroomDto, InputClassroomDto, GetClassroomDetailDto, GetClassroomListDto> {


    @Override
    public Classroom fromCreateDto(InputClassroomDto inputClassroomDto) {
        return new Classroom(inputClassroomDto.getName());
    }

    @Override
    public void updateFromDto(Classroom entity, InputClassroomDto inputClassroomDto) {
        entity.setName((inputClassroomDto.getName()));
    }

    @Override
    public GetClassroomDetailDto toDetailDto(Classroom entity) {
        return new GetClassroomDetailDto(entity.getId(), entity.getName());
    }

    @Override
    public GetClassroomListDto toListDto(Classroom entity) {
        return new GetClassroomListDto(entity.getId(), entity.getName(), entity.getStudents().size());
    }
}
