package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.component.*;
import com.brodeckyondrej.SignUp.business.service.component.SignComponentService;
import com.brodeckyondrej.SignUp.persistence.entity.SignComponent;
import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacher;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.UUID;


@RestController
@RequestMapping("/sign-component")
public class SignComponentController extends EntityController<SignComponent, SignComponentCreateDto, SignComponentUpdateDto, SignComponentGetDetailDto, SignComponentGetListDto> {

    private final SignComponentService signComponentService;

    public SignComponentController(SignComponentService service){
        super(service);
        this.signComponentService = service;
    }

    @PostMapping("/search")
    public ResponseEntity<Page<SignComponentGetListDto>> search(
            @PageableDefault(sort = "textDescription", direction = Sort.Direction.ASC)
            @RequestBody @Valid SignComponentSearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(signComponentService.search(dto, pageable));
    }

    @Override
    @PostMapping
    @AtLeastTeacher
    public ResponseEntity<SignComponentGetDetailDto> create(@Valid @RequestBody SignComponentCreateDto dto) {
        return super.create(dto);
    }

    @Override
    @PutMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<SignComponentGetDetailDto> update(@Valid @RequestBody SignComponentUpdateDto dto, @PathVariable UUID id){
        return super.update(dto, id);
    }

    @Override
    @DeleteMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return super.delete(id);
    }
}
