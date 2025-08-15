package com.brodeckyondrej.SignUp.TestClass;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TestClass {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String message;
}
