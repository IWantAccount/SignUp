package com.brodeckyondrej.SignUp.util;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SpecificationBuilder<T> {
    private final List<Specification<T>> specs = new ArrayList<>();

    public SpecificationBuilder<T> addSpec(Specification<T> spec) {
        specs.add(spec);
        return this;
    }

    public SpecificationBuilder<T> addSpecIfNotNull(Specification<T> spec, Object val) {
        if(val != null) {
            specs.add(spec);
        }
        return this;
    }

    public Specification<T> build() {
        return Specification.allOf(specs);
    }

}
