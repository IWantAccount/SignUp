package com.brodeckyondrej.SignUp.persistence.entity;

import com.brodeckyondrej.SignUp.persistence.enumerated.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@BatchSize(size = 20)
@Entity
@Table(name = "invite")
public class Invite extends BaseEntity {

    @NotNull
    @Column(name = "role")
    private UserRole role;

    @Column(name = "used_at")
    private Instant usedAt;


    @JoinColumn(name = "created_user_id")
    @OneToOne(fetch = FetchType.LAZY)
    private User createdUser;

    protected Invite() {

    }
}
