package com.brodeckyondrej.SignUp.business.specification;

import com.brodeckyondrej.SignUp.persistence.embeded.SignNotation_;
import com.brodeckyondrej.SignUp.persistence.entity.*;
import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import com.brodeckyondrej.SignUp.persistence.embeded.HandNotation_;
import jakarta.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;
import java.util.UUID;


public class SignSpecification extends IdSpecification{

    public static Specification<Sign> hasTranslationLike(String translation) {

        return (root, query, cb) -> {
            if(translation == null || translation.isEmpty()) {
                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(root.join(Sign_.translations)),
                    "%" + translation.toLowerCase() + "%"
            );
        };
    }

    public static Specification<Sign> isInPrivateCollection(PrivateCollection privateCollection) {
        return (root, query, cb) -> {

            if(privateCollection == null) {
                return cb.conjunction();
            }

            Expression<Set<PrivateCollection>> inCollections = root.get(Sign_.inPrivateCollections);
            return cb.isMember(privateCollection, inCollections);
        };
    }

    public static Specification<Sign> isInCategory(Category category) {
        return (root, query, cb) -> {
            if(category == null) {
                return cb.conjunction();
            }

            return cb.equal(root.get(Sign_.category), category);
        };
    }

    public static Specification<Sign> hasType(SignType type) {
        return (root, query, cb) -> {
          if(type == null) {
              return cb.conjunction();
          }
          return cb.equal(root.get(Sign_.type), type);
        };
    }

    public static Specification<Sign> hasLanguageLevel(LanguageLevel languageLevel){
        return (root, query, cb) -> {
          if(languageLevel == null) {
              return cb.conjunction();
          }
          return cb.equal(root.get(Sign_.languageLevel), languageLevel);
        };
    }

    public static Specification<Sign> hasRegion(Region region) {
        return (root, query, cb) -> {
          if(region == null) {
              return cb.conjunction();
          }
          return cb.equal(root.get(Sign_.region), region);
        };
    }


    public static Specification<Sign> bothHandsUsed(Boolean bothUsed) {
        return (root, query, cb) -> cb.equal(root
                .get(Sign_.signNotation)
                .get(SignNotation_.bothHandsUsed), bothUsed);
    }

    public static Specification<Sign> isAsymmetric(Boolean asymmetricSign){
        return (root, query, cb) -> cb.equal(root
                .get(Sign_.signNotation)
                .get(SignNotation_.asymmetricSign), asymmetricSign);
    }

    public static Specification<Sign> hasActiveHandShapeId(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.activeHandNotation)
                    .get(HandNotation_.handShape)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasActivePalmOrientation(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.activeHandNotation)
                    .get(HandNotation_.palmOrientation)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasActiveFingerOrientation(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.activeHandNotation)
                    .get(HandNotation_.fingerOrientation)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasPassiveHandShapeId(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.passiveHandNotation)
                    .get(HandNotation_.handShape)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasPassivePalmOrientation(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.passiveHandNotation)
                    .get(HandNotation_.palmOrientation)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasPassiveFingerOrientation(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }

            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.passiveHandNotation)
                    .get(HandNotation_.fingerOrientation)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasLocation(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }
            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.articulationLocation)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasMovement(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }
            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.movement)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasContact(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }
            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.contact)
                    .get(SignComponent_.id), id);
        };
    }

    public static Specification<Sign> hasHandArrangement(UUID id) {
        return (root, query, cb) -> {
            if(id == null) {
                return cb.conjunction();
            }
            return cb.equal(root
                    .get(Sign_.signNotation)
                    .get(SignNotation_.handArrangement)
                    .get(SignComponent_.id), id);
        };
    }

}
