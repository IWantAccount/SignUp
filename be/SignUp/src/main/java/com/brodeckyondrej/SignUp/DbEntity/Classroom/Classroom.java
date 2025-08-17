package com.brodeckyondrej.SignUp.DbEntity.Classroom;

import com.brodeckyondrej.SignUp.DbEntity.User.Student;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Entity
@Table(name = "classroom")
@Getter
public class Classroom extends NamedEntity {

    @NotNull
    @OneToMany(mappedBy = "classroom", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private Set<Student> students;
}
