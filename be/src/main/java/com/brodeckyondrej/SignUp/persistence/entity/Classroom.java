package com.brodeckyondrej.SignUp.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "classroom")
@Getter
@AllArgsConstructor
@BatchSize(size = 20)
public class Classroom extends NamedEntity {

    @NotNull
    @OneToMany(mappedBy = "classroom", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private Set<User> students;

    public Classroom(String name){
        super(name);
        this.students = new HashSet<>();
    }

    protected Classroom() {

    }
}
