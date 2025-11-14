package com.brodeckyondrej.SignUp.business.service.component;

import com.brodeckyondrej.SignUp.business.dto.component.*;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.persistence.repository.SignComponentRepository;
import com.brodeckyondrej.SignUp.persistence.enumerated.SignComponentType;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Transactional
public class SignComponentService extends EntityService<SignComponent, SignComponentCreateDto, SignComponentUpdateDto, SignComponentGetDetailDto, SignComponentGetListDto> {
    private final SignComponentRepository signComponentRepository;
    public SignComponentService(SignComponentRepository repository, SignComponentValidator validator, SignComponentMapper mapper){
        super(repository, validator, mapper);
        this.signComponentRepository = repository;
    }

    public Page<SignComponentGetListDto> findByTypeAndDescription(SignComponentType type, String description, Pageable pageable){
        Page<SignComponent> res;
        if(description.isEmpty() && type != null){
            res = signComponentRepository.findByType(type, pageable);
        }
        else if(description.isEmpty() && type == null) {
            res = signComponentRepository.findAll(pageable);
        }
        else if(!description.isEmpty() && type == null) {
            res = signComponentRepository.findByTextDescriptionContainingIgnoreCase(description, pageable);
        }
        else {
            res = signComponentRepository.findByTypeAndTextDescriptionContainingIgnoreCase(type, description, pageable);
        }

        return res.map(mapper::toListDto);
    }
}
