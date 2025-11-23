package com.brodeckyondrej.SignUp.persistence.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "subject")
@Getter
@BatchSize(size = 20)
public class Subject extends NamedEntity {
    @OneToMany(mappedBy = "subject", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
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
