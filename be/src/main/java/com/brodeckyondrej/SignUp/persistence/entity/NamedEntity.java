package com.brodeckyondrej.SignUp.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@MappedSuperclass
public abstract class NamedEntity extends BaseEntity {
    //TODO odstranit unique. Netuším, proč to tady je...
    @Column(unique = false, nullable = false)
    private String name;
}
