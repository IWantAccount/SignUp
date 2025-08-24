package com.brodeckyondrej.SignUp.DbEntity.PrivateCollection;

import com.brodeckyondrej.SignUp.DbEntity.Sign.Sign;
import com.brodeckyondrej.SignUp.DbEntity.User.User;
import com.brodeckyondrej.SignUp.Universal.NamedEntity.NamedEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;
@Entity
@Table(name = "private_collection")
@Getter
public class PrivateCollection extends NamedEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "user_id")
    @NotNull
    private User owner;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "private_collection_sign",
            joinColumns = @JoinColumn(name = "private_collection_id"),
            inverseJoinColumns = @JoinColumn(name = "sign_id")
    )
    private Set<Sign> signs;

    public PrivateCollection(User owner, String name) {
        super(name);
        this.owner = owner;
    }

    protected PrivateCollection() {

    }

    public void addSign(Sign sign) {
        signs.add(sign);
    }

    public void removeSign(Sign sign) {
        signs.remove(sign);
    }
}
