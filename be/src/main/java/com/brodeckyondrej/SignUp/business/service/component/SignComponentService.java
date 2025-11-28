package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.*;
import com.brodeckyondrej.SignUp.business.specification.SignComponentSpecification;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.persistence.repository.SignComponentRepository;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.util.SpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SignComponentService extends EntityService<SignComponent, SignComponentCreateDto, SignComponentUpdateDto, SignComponentGetDetailDto, SignComponentGetListDto> {
    private final SignComponentRepository signComponentRepository;
    public SignComponentService(SignComponentRepository repository, SignComponentValidator validator, SignComponentMapper mapper){
        super(repository, validator, mapper);
        this.signComponentRepository = repository;
    }


    public Page<SignComponentGetListDto> search(SignComponentSearchDto dto, Pageable pageable){
        Specification<SignComponent> spec = new SpecificationBuilder<SignComponent>()
                .addSpecIfNotNull(SignComponentSpecification.hasDescriptionLike(dto.getDescription()), dto.getDescription())
                .addSpecIfNotNull(SignComponentSpecification.hasType(dto.getType()), dto.getType())
                .build();

        return signComponentRepository.findAll(spec, pageable).map(mapper::toListDto);
    }
}
