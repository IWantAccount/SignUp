package com.brodeckyondrej.SignUp.api.controller.universal;

import com.brodeckyondrej.SignUp.business.service.universal.EntityService;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.persistence.entity.BaseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
/**
 * Parent class of controllers. Its methods can be overwritten especially for securing endpoints with annotations
 * */
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


    /**
     * It is possible to get custom paging (page size, page offset) and sorting (see Pageable)
     * @return Single page of GetListDto type.
     * */
    @GetMapping()
    public ResponseEntity<Page<GetListDto>> getAllPaged(Pageable pageable){
        return ResponseEntity.ok(entityService.getAllPaged(pageable));
    }

    /**
     * @return entity of type Entity with given id. T
     * @throws MissingObjectException if entity is not found.
     * */
    @GetMapping("/{id}")
    public ResponseEntity<GetDetailDto> getById(@PathVariable UUID id){
        return ResponseEntity.ok(entityService.getById(id));
    }

    /**
     * Saves new entity to database. Does mapping to type Entity
     * @return copy of created entity mapped to GetDetailDto
     * */
    @PostMapping()
    public ResponseEntity<GetDetailDto> create(@RequestBody @Valid CreateDto createDto){
        return ResponseEntity.ok(entityService.create(createDto));
    }

    /**
     * Updates entity with given id with attributes of updateDto
     * @return Updated copy of entity
     * @throws MissingObjectException if entity with given id is not found
     * */
    @PutMapping("/{id}")
    public ResponseEntity<GetDetailDto> update(@RequestBody @Valid UpdateDto updateDto, @PathVariable UUID id){
        return ResponseEntity.ok(entityService.update(id, updateDto));
    }
    /**
     * Deletes entity with given id
     * */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id){
        entityService.delete(id);
        return ResponseEntity.ok().build();
    }

}
