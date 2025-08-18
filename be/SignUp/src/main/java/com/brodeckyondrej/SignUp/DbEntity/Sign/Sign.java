package com.brodeckyondrej.SignUp.DbEntity.Sign;

import com.brodeckyondrej.SignUp.DbEntity.Category.Category;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Enum.LanguageLevel;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Enum.Region;
import com.brodeckyondrej.SignUp.DbEntity.Sign.Enum.SignType;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Components.*;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.BaseEntity;
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
    private String pathToVideo;

    @ManyToOne
    @JoinColumn(name = "hand_shape_id")
    private HandShape handShape;

    @ManyToOne
    @JoinColumn(name = "location_component_id")
    private LocationComponent location;

    @ManyToOne
    @JoinColumn(name = "movement_component_id")
    private MovementComponent movementComponent;

    @ManyToOne
    @JoinColumn(name = "palm_orientation_id")
    private PalmOrientation palmOrientation;

    @ManyToOne
    @JoinColumn(name = "finger_orientation_id")
    private FingerOrientation fingerOrientation;

    @ManyToOne
    @JoinColumn(name = "contact_region_id")
    private ContactRegion contactRegion;

    @ManyToOne
    @JoinColumn(name = "hand_arrangement_id")
    private HandArrangement handArrangement;
}
