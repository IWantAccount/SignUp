package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.sign.CreateSignDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.UpdateSignDto;
import com.brodeckyondrej.SignUp.business.service.sign.SignService;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/sign")
public class SignController extends EntityController<Sign, CreateSignDto, UpdateSignDto, SignGetDetailDto, SignGetListDto> {

    public SignController(SignService service){
        super(service);
    }

    @Override
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SignGetDetailDto> create(@Valid @ModelAttribute CreateSignDto createSignDto) {
        return super.create(createSignDto);
    }
}
