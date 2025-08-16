package com.brodeckyondrej.SignUp.Universal.AbstractEntity;

import com.brodeckyondrej.SignUp.Universal.AbstractEntity.Service.EntityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        > {

    private final EntityService<
                Entity,
                CreateDto,
                UpdateDto,
                GetDetailDto,
                GetListDto
                > entityService;

    //For debug
    //TODO remove this
    @GetMapping("/all")
    public ResponseEntity<List<GetListDto>> getAll(){
        return ResponseEntity.ok(entityService.getAll());
    }

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
