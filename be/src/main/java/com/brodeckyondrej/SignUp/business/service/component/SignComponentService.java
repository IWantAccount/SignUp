package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentDto;
import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.persistence.repository.SignComponentRepository;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Transactional
public class SignComponentService extends EntityService<SignComponent, ComponentDto, ComponentDto, ComponentIdDto, ComponentIdDto> {
    private final SignComponentRepository signComponentRepository;
    public SignComponentService(SignComponentRepository repository, SignComponentValidator validator, SignComponentMapper mapper){
        super(repository, validator, mapper);
        this.signComponentRepository = repository;
    }

    public List<ComponentIdDto> findByType(SignComponentType type){
        return signComponentRepository.findByType(type)
                .stream()
                .map(mapper::toListDto)
                .toList();
    }
}
