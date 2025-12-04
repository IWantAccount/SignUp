package com.brodeckyondrej.SignUp.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import java.time.Instant;

@BatchSize(size = 20)
@Entity
@Table(name = "announcement")
@AllArgsConstructor
@Getter
public class Announcement extends BaseEntity {

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Setter
    @Column(name = "title")
    private String title;

    @Setter
    @Column(name = "content", length = 1000)
    private String content;

    protected Announcement() {

    }
}
