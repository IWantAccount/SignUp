package com.brodeckyondrej.SignUp.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Getter
@Entity
@Table(name = "category")
public class Category extends NamedEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "subject_id")
    @NotNull
    @Setter
    private Subject subject;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Sign> signs;

    protected Category() {

    }

    public Category(Subject subject, String name){
        super(name);
        this.subject = subject;
        this.signs = new HashSet<>();
    }
}
