package com.brodeckyondrej.SignUp.util;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * Utility class for easier manipulation with Specifications.
 * <p>Example:</p>
 * <pre>
 *
 *     {@code
 *       SpecificationBuilder<User> specBuilder = new SpecificationBuilder<>();
 *         specBuilder
 *                 .addSpecIfNotNull(UserSpecification.hasEmailLike(dto.getEmail()), dto.getEmail())
 *                 .addSpecIfNotNull(UserSpecification.hasRole(dto.getRole()), dto.getRole())
 *                 .addSpecIfNotNull(UserSpecification.hasNameLike(dto.getName()), dto.getName());
 *
 *         if(dto.getSubjectId() != null) {
 *             Subject subject = subjectRepository.findByIdOrThrow(dto.getSubjectId());
 *             specBuilder.addSpec(UserSpecification.isInSubject(subject));
 *         }
 *
 *         if(dto.getClassroomId() != null) {
 *             Classroom classroom = classroomRepository.findByIdOrThrow(dto.getClassroomId());
 *             specBuilder.addSpec(UserSpecification.isInClassroom(classroom));
 *         }
 *
 *         return userRepository.findAll(specBuilder.build(), pageable).map(userMapper::toListDto);
 *     }
 *
 * </pre>
 * */
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
