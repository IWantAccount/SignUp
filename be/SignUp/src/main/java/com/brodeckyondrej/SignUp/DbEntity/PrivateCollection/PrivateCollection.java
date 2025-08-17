package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection;

import com.brodeckyondrej.SignUp.DbEntity.Sign.Sign;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;
@Entity
@Table(name = "private_collection")
public class PrivateCollection extends NamedEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "user_id")
    @NotNull
    private User owner;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Sign> signs;
}
