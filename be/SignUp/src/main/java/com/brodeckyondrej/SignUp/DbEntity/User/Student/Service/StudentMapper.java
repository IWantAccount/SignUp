package com.brodeckyondrej.SignUp.DbEntity.User.Student.Service;

import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.CreateStudentDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.StudentGetDetailDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.StudentGetListDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Dto.UpdateStudentDto;
import com.brodeckyondrej.SignUp.DbEntity.User.Student.Student;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityMapper;
import org.springframework.stereotype.Service;

@Service
public class StudentMapper implements EntityMapper<Student, CreateStudentDto, UpdateStudentDto, StudentGetDetailDto, StudentGetListDto> {
    @Override
    public Student fromCreateDto(CreateStudentDto createStudentDto) {
        return null;
    }

    @Override
    public void updateFromDto(Student entity, UpdateStudentDto updateStudentDto) {

    }

    @Override
    public StudentGetDetailDto toDetailDto(Student entity) {
        return null;
    }

    @Override
    public StudentGetListDto toListDto(Student entity) {
        return null;
    }
}
