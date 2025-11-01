package com.brodeckyondrej.SignUp.persistence.entity;

import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "sign_component")
public class SignComponent extends BaseEntity {

    @NotBlank
    @Column(name = "text_description")
    private String textDescription;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SignComponentType type;

    protected SignComponent() {

    }
}
