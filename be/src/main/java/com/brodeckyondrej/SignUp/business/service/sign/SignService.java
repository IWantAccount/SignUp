package com.brodeckyondrej.SignUp.business.service.sign;

import com.brodeckyondrej.SignUp.business.dto.sign.CreateSignDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.UpdateSignDto;
import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.persistence.repository.SignRepository;
import org.springframework.stereotype.Service;

@Service
public class SignService extends EntityService<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    public SignService(SignRepository repository, SignValidator validator, SignMapper mapper) {
        super(repository, validator, mapper);
    }
}
