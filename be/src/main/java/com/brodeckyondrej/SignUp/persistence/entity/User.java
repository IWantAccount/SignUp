package com.brodeckyondrej.SignUp.persistence.entity;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "signup_user")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@BatchSize(size = 100)
public class User extends NamedEntity {

    @NotBlank
    private String password;

    @NotBlank
    @Column(unique = true)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY,  cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<PrivateCollection> signCollection;

    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @ManyToMany(mappedBy = "students", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Subject> subjects;

    public User(String name, String password, String email, UserRole role){
        super(name);
        this.password = password;
        this.email = email;
        this.role = role;

        signCollection = new HashSet<>();
        subjects = new HashSet<>();
    }

    protected User(){

    }
}
