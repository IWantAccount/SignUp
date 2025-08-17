package com.brodeckyondrej.SignUp.Universal.NamedEntity;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@MappedSuperclass
public abstract class NamedEntity extends BaseEntity {
    @Column(unique = true, nullable = false, name = "name")
    private String name;
}
