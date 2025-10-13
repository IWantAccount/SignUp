package com.brodeckyondrej.SignUp.persistence.embeded;

import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class SignNotation {
    private boolean bothHandsUsed;
    private boolean asymmetricSign;

    @Embedded
    @AssociationOverrides({
            @AssociationOverride(name = "handShape",        joinColumns = @JoinColumn(name = "active_hand_shape_id")),
            @AssociationOverride(name = "palmOrientation",  joinColumns = @JoinColumn(name = "active_palm_orientation_id")),
            @AssociationOverride(name = "fingerOrientation",joinColumns = @JoinColumn(name = "active_finger_orientation_id"))
    })
    private HandNotation activeHandNotation;

    @Embedded
    @AssociationOverrides({
            @AssociationOverride(name = "handShape",        joinColumns = @JoinColumn(name = "passive_hand_shape_id")),
            @AssociationOverride(name = "palmOrientation",  joinColumns = @JoinColumn(name = "passive_palm_orientation_id")),
            @AssociationOverride(name = "fingerOrientation",joinColumns = @JoinColumn(name = "passive_finger_orientation_id"))
    })
    private HandNotation passiveHandNotation;

    @ManyToOne@Getter
    @JoinColumn(name = "location_component_id")
    private SignComponent articulationLocation;

    @ManyToOne
    @JoinColumn(name = "movement_component_id")
    private SignComponent movement;

    @ManyToOne
    @JoinColumn(name = "contact_component_id")
    private SignComponent contact;

    @ManyToOne
    @JoinColumn(name = "hand_arrangement_id")
    private SignComponent handArrangement;

    public HandNotation getActiveHandNotation() {
        if(activeHandNotation == null) {
            activeHandNotation = new HandNotation();
        }

        return activeHandNotation;
    }

    public HandNotation getPassiveHandNotation() {
        if(passiveHandNotation == null) {
            passiveHandNotation = new HandNotation();
        }

        return passiveHandNotation;
    }
}
