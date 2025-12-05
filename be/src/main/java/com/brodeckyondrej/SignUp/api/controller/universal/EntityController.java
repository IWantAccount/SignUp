package com.brodeckyondrej.SignUp.api.controller.universal;

import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public abstract class EntityController<
        Entity extends BaseEntity,
        CreateDto,
        UpdateDto,
        GetDetailDto,
        GetListDto
        > extends BaseController{

    private final EntityService<
                Entity,
                CreateDto,
                UpdateDto,
                GetDetailDto,
                GetListDto
                > entityService;


    @GetMapping()
    public ResponseEntity<Page<GetListDto>> getAllPaged(Pageable pageable){
        return ResponseEntity.ok(entityService.getAllPaged(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetDetailDto> getById(@PathVariable UUID id){
        return ResponseEntity.ok(entityService.getById(id));
    }

    @PostMapping()
    public ResponseEntity<GetDetailDto> create(@RequestBody @Valid CreateDto createDto){
        return ResponseEntity.ok(entityService.create(createDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GetDetailDto> update(@RequestBody @Valid UpdateDto updateDto, @PathVariable UUID id){
        return ResponseEntity.ok(entityService.update(id, updateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        entityService.delete(id);
        return ResponseEntity.ok().build();
    }

}
