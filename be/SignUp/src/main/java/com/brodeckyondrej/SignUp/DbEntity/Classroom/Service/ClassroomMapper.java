package com.brodeckyondrej.SignUp.DbEntity.Classroom.Service;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.GetClassroomListDto;
import com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto.InputClassroomDto;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Component;

@Component
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
        return new GetClassroomDetailDto(entity.getId(), entity.getName(), entity.getStudents().stream().toList());
    }

    @Override
    public GetClassroomListDto toListDto(Classroom entity) {
        return new GetClassroomListDto(entity.getId(), entity.getName(), entity.getStudents().size());
    }
}
