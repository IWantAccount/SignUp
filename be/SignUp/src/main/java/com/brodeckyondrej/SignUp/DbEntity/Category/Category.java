package com.brodeckyondrej.SignUp.DbEntity.Category;

import com.brodeckyondrej.SignUp.DbEntity.Sign.Sign;
import com.brodeckyondrej.SignUp.DbEntity.Subject.Subject;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Getter
@Entity
@Table(name = "category")
public class Category extends NamedEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "subject_id")
    @NotNull
    private Subject subject;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<Sign> signs;
}
