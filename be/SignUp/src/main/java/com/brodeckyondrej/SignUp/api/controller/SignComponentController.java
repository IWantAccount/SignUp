package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.component.ComponentDto;
import com.brodeckyondrej.SignUp.business.dto.component.ComponentIdDto;
import com.brodeckyondrej.SignUp.business.dto.component.ComponentTypeDto;
import com.brodeckyondrej.SignUp.business.service.component.SignComponentService;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sign-component")
public class SignComponentController extends EntityController<SignComponent, ComponentDto, ComponentDto, ComponentIdDto, ComponentIdDto> {

    private final SignComponentService signComponentService;

    public SignComponentController(SignComponentService service){
        super(service);
        this.signComponentService = service;
    }

    //TODO zjistit, jestli je ten post tady good practice. A co stránkování? technicky by na BE šlo snadno, v UI chci
    // Combo box. To by asi se stránkováním bylo otravný
    @PostMapping("/by-type")
    public ResponseEntity<List<ComponentIdDto>> getByType(@RequestBody @Valid ComponentTypeDto dto){
        return ResponseEntity.ok(signComponentService.findByType(dto.getType()));
    }
}
