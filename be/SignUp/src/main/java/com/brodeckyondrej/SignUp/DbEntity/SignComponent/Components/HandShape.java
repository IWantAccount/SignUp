package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Components;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponent;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Table(name = "hand_shape")
@Getter
public class HandShape extends SignComponent {
}
