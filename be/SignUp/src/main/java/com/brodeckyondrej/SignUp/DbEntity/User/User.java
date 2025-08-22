package com.brodeckyondrej.SignUp.DbEntity.User;

import com.brodeckyondrej.SignUp.DbEntity.Classroom.Classroom;
import com.brodeckyondrej.SignUp.DbEntity.PrivateCollection.PrivateCollection;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "signup_user")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User extends NamedEntity {

    @NotBlank
    private String password;

    @NotBlank
    @Column(unique = true)
    private String email;

    @NotNull
    private UserRole role;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<PrivateCollection> signCollection;

    @ManyToOne
    @JoinColumn(name = "classroom_id")
    @NotNull
    private Classroom classroom;

    @ManyToMany(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Subject> subjects;
}
