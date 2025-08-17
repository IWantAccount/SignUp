package com.brodeckyondrej.SignUp.DbEntity.Classroom.Dto;

import com.brodeckyondrej.SignUp.DbEntity.User.Student.Student;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.Dto.NamedDtoWithId;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
public class GetClassroomDetailDto extends NamedDtoWithId {
    private List<Student> students;
    private int numberOfStudents;

    public GetClassroomDetailDto (UUID id, String name, List<Student> students){
        super(id, name);
        this.students = students;
        this.numberOfStudents = students.size();
    }
}
