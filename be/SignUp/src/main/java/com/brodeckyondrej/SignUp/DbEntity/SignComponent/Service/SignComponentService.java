package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Service;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentDto;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentIdDto;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponent;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponentRepository;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponentType;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityService;
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
