package com.brodeckyondrej.SignUp.DbEntity.SignComponent.Service;

import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentDto;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentIdDto;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.Dto.ComponentTypeDto;
import com.brodeckyondrej.SignUp.DbEntity.SignComponent.SignComponent;
import com.brodeckyondrej.SignUp.Universal.AbstractEntity.EntityController;
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
