package com.brodeckyondrej.SignUp.DbEntity.Subject;
import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subject")
@Getter
public class Subject extends NamedEntity {
    @OneToMany(mappedBy = "subject")
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Category> categories;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "subject_student",
        joinColumns = @JoinColumn(name = "subject_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<User> students;

    public Subject(String name){
        super(name);
        categories = new HashSet<>();
        students = new HashSet<>();
    }

    public void addStudent(User user){
        students.add(user);
    }

    public void removeStudent(User user){
        students.remove(user);
    }

    protected Subject(){

    }
}
