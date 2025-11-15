package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.sign.SignCreateDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetDetailDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignGetListDto;
import com.brodeckyondrej.SignUp.business.dto.sign.SignUpdateDto;
import com.brodeckyondrej.SignUp.business.service.sign.SignService;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.UUID;


@RestController()
@RequestMapping("/sign")
public class SignController extends EntityController<Sign, SignCreateDto, SignUpdateDto, SignGetDetailDto, SignGetListDto> {

    private final SignService signService;

    public SignController(SignService service){
        super(service);
        this.signService = service;
    }

    @Override
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SignGetDetailDto> create(@Valid @ModelAttribute SignCreateDto signCreateDto) {
        return super.create(signCreateDto);
    }

    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<Page<SignGetListDto>> getByCategoryId(@PathVariable UUID categoryId, Pageable pageable) {
        Page<SignGetListDto> result = signService.getByCategoryId(categoryId, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/by-private-collection/{collectionId}")
    public ResponseEntity<Page<SignGetListDto>> getByCollectionId(@PathVariable UUID collectionId, Pageable pageable) {
        Page<SignGetListDto> result = signService.getByPrivateCollectionId(collectionId, pageable);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/debug/all")
    public ResponseEntity<Void> deleteAll(){
        signService.getAll().forEach(sign -> {
            signService.delete(sign.getId());
        });
        return ResponseEntity.noContent().build();
    }
}
