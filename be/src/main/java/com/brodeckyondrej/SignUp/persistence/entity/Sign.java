package com.brodeckyondrej.SignUp.persistence.entity;

import com.brodeckyondrej.SignUp.persistence.enumerated.LanguageLevel;
import com.brodeckyondrej.SignUp.persistence.enumerated.Region;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@Entity
@Table(name = "sign")
@Getter
@Setter
public class Sign extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @JoinColumn(name = "category_id")
    private Category category;

    @Enumerated(EnumType.STRING)
    @NotNull
    private SignType type;

    @Enumerated(EnumType.STRING)
    private LanguageLevel languageLevel;

    @Enumerated(EnumType.STRING)
    private Region region;

    @ElementCollection
    @CollectionTable(
            name = "sign_translations",
            joinColumns = @JoinColumn(name = "sign_id")
    )
    private Set<String> translations;


    private String explanation;

    @NotBlank
    private String videoFileName;

    @ManyToOne
    @JoinColumn(name = "hand_shape_id")
    private SignComponent handShape;

    @ManyToOne
    @JoinColumn(name = "location_component_id")
    private SignComponent location;

    @ManyToOne
    @JoinColumn(name = "movement_component_id")
    private SignComponent movementComponent;

    @ManyToOne
    @JoinColumn(name = "palm_orientation_id")
    private SignComponent palmOrientation;

    @ManyToOne
    @JoinColumn(name = "finger_orientation_id")
    private SignComponent fingerOrientation;

    @ManyToOne
    @JoinColumn(name = "contact_region_id")
    private SignComponent contactRegion;

    @ManyToOne
    @JoinColumn(name = "hand_arrangement_id")
    private SignComponent handArrangement;

    @ManyToMany(mappedBy = "signs", fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    @NotNull
    private Set<PrivateCollection> inPrivateCollections;
}
