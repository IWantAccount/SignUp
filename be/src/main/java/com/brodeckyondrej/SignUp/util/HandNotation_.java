package com.brodeckyondrej.SignUp.util;

import com.brodeckyondrej.SignUp.persistence.embeded.HandNotation;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/*
* It seems that Hibernate cant always generate correct metamodels for complex classes especially with lombok.
* This is used instead of generated file. This class unfortunately needs to be changed when HandNotation is changed
* */
@StaticMetamodel(HandNotation.class)
public class HandNotation_ {
    public static volatile SingularAttribute<HandNotation, SignComponent> handShape;
    public static volatile SingularAttribute<HandNotation, SignComponent> palmOrientation;
    public static volatile SingularAttribute<HandNotation, SignComponent> fingerOrientation;
}
