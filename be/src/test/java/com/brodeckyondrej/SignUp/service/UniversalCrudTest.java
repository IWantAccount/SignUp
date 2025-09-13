package com.brodeckyondrej.SignUp.service;

import com.brodeckyondrej.SignUp.business.dto.classroom.CreateClassroomDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.GetClassroomDetailDto;
import com.brodeckyondrej.SignUp.business.dto.classroom.UpdateClassroomDto;
import com.brodeckyondrej.SignUp.business.service.classroom.ClassroomService;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.Classroom;
import com.brodeckyondrej.SignUp.persistence.repository.ClassroomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
public class UniversalCrudTest {
    //This is test of EntityService methods. ClassroomService is one of its child classes
    @Autowired
    private ClassroomService service;

    @Autowired
    private ClassroomRepository repository;

    private Classroom CREATED_CLASSROOM;
    private UUID RANDOM_ID = UUID.randomUUID();

    @BeforeEach
    void setUp(){
        Classroom classroom = new Classroom("Prepared classroom");
        CREATED_CLASSROOM = repository.save(classroom);
    }

    @Test
    void create_success(){
        String classroomName = "TestClassroom";
        CreateClassroomDto createDto = new CreateClassroomDto(classroomName);
        GetClassroomDetailDto created = service.create(createDto);

        assertThat(created).isNotNull();
        assertThat(created.getName()).isEqualTo(classroomName);
        Classroom foundClassroom = repository.findByIdOrThrow(created.getId());
        assertThat(foundClassroom.getName()).isEqualTo(classroomName);
    }

    @Test
    void get_success(){
        GetClassroomDetailDto found = service.getById(CREATED_CLASSROOM.getId());
        assertThat(found).isNotNull();
        assertThat(found.getName()).isEqualTo(CREATED_CLASSROOM.getName());
    }

    @Test
    void get_notExisting_MissingObjectException(){
        assertThatThrownBy(() -> service.getById(RANDOM_ID))
                .isInstanceOf(MissingObjectException.class);
    }

    @Test
    void update_success(){
        UpdateClassroomDto updateDto = new UpdateClassroomDto("New amazing name");
        service.update(CREATED_CLASSROOM.getId(), updateDto);

        Classroom foundClassroom = repository.findByIdOrThrow(CREATED_CLASSROOM.getId());
        assertThat(foundClassroom.getName()).isEqualTo(updateDto.getName());
    }

    @Test
    void update_notExisting_MissingObjectException(){
        UpdateClassroomDto updateDto = new UpdateClassroomDto("New amazing name");

        assertThatThrownBy(() -> service.update(RANDOM_ID, updateDto))
                .isInstanceOf(MissingObjectException.class);


    }

    @Test
    void delete_success(){
        service.delete(CREATED_CLASSROOM.getId());

        assertThatThrownBy(() -> repository.findByIdOrThrow(CREATED_CLASSROOM.getId()))
                .isInstanceOf(MissingObjectException.class);
    }
}
