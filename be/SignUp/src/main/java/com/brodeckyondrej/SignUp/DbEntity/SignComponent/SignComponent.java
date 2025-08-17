package com.brodeckyondrej.SignUp.DbEntity.SignComponent;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public abstract class SignComponent extends BaseEntity {
    private String component;
}
