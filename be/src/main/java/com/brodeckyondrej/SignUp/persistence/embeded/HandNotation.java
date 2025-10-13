package com.brodeckyondrej.SignUp.persistence.embeded;

import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class HandNotation {
    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private SignComponent handShape;

    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private SignComponent palmOrientation;

    @ManyToOne(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SELECT)
    private SignComponent fingerOrientation;
}
