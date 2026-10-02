package com.brodeckyondrej.SignUp.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.Instant;

@Getter
@Entity
@AllArgsConstructor
@BatchSize(size = 20)
@Table(name = "passwd_req")
public class PasswordResetRequest extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @Column(name = "created_at")
    private Instant createdAt;

    @Setter
    @Column(name = "used")
    private Boolean used;

    protected PasswordResetRequest() {

    }
}
