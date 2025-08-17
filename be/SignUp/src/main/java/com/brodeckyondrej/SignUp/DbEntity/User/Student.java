package com.brodeckyondrej.SignUp.DbEntity.User;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Entity
public class Student extends User {
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    @NotNull
    private Classroom classroom;

    @ManyToMany(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Subject> subjects;
}
