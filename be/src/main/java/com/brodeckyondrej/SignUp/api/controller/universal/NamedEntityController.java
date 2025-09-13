package com.brodeckyondrej.SignUp.api.controller.universal;

import com.brodeckyondrej.SignUp.business.dto.universal.NamedDto;
import com.brodeckyondrej.SignUp.business.dto.universal.NamedDtoWithId;
import com.brodeckyondrej.SignUp.business.service.universal.NamedEntityService;
import com.brodeckyondrej.SignUp.persistence.entity.NamedEntity;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public abstract class NamedEntityController<
        Entity extends NamedEntity,
        CreateDto extends NamedDto,
        UpdateDto extends NamedDto,
        GetDetailDto extends NamedDtoWithId,
        GetListDto extends NamedDtoWithId,
        DtoWithName extends NamedDto

        >  extends EntityController <Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> {
    private final NamedEntityService<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> service;

    public NamedEntityController(NamedEntityService<Entity, CreateDto, UpdateDto, GetDetailDto, GetListDto> namedEntityService) {
        super(namedEntityService);
        this.service = namedEntityService;
    }

    @GetMapping("/by-name")
    public ResponseEntity<List<GetListDto>> getByName(@Valid DtoWithName dto) {
        return ResponseEntity.ok(service.findByName(dto.getName()));
    }
}
