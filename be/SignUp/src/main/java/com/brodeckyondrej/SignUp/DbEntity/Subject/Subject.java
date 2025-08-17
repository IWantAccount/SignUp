package com.brodeckyondrej.SignUp.DbEntity.Subject;
import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.User.Student;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Entity
@Table(name = "subject")
public class Subject extends NamedEntity {
    @OneToMany(mappedBy = "subject")
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Category> categories;

    @ManyToMany
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Student> students;
}
