package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.dto.collection.*;
import com.brodeckyondrej.SignUp.business.service.collection.PrivateCollectionService;
import com.brodeckyondrej.SignUp.business.dto.universal.FindByNameDto;
import com.brodeckyondrej.SignUp.api.controller.universal.NamedEntityController;
import com.brodeckyondrej.SignUp.persistence.entity.PrivateCollection;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/private-collection")
public class PrivateCollectionController extends NamedEntityController<
        PrivateCollection,
        PrivateCollectionCreateDto,
        PrivateCollectionUpdateDto,
        PrivateCollectionGetDetailDto,
        PrivateCollectionGetListDto,
        FindByNameDto
        > {

    private final PrivateCollectionService privateCollectionService;

    public PrivateCollectionController(PrivateCollectionService service){
        super(service);
        this.privateCollectionService = service;
    }

    @PostMapping("/add-sign")
    public ResponseEntity<Void> addSignToCollection(@Valid @RequestBody CollectionSignDto dto){
        privateCollectionService.addSignToPrivateCollection(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove-sign")
    public ResponseEntity<Void> removeSignFromCollection(@Valid @RequestBody CollectionSignDto dto){
        privateCollectionService.removeSignFromPrivateCollection(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/search")
    public ResponseEntity<Page<PrivateCollectionGetListDto>> search(@Valid @RequestBody FindByNameDto dto, Pageable pageable){
        return ResponseEntity.ok(privateCollectionService.search(dto, pageable));
    }
}
