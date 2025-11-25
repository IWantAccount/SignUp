package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.sign.*;
import com.brodeckyondrej.SignUp.business.dto.sign.search.SearchDto;
import com.brodeckyondrej.SignUp.business.dto.sign.search.SearchEntityDto;
import com.brodeckyondrej.SignUp.business.service.sign.SignService;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;


@RestController()
@RequestMapping("/sign")
public class SignController extends EntityController<Sign, SignCreateDto, SignUpdateDto, SignGetDetailDto, SignGetListDto> {

    private final SignService signService;

    public SignController(SignService service){
        super(service);
        this.signService = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SignGetDetailDto> create(@RequestPart("dto") @Valid SignCreateDto dto, @RequestPart("video") MultipartFile videoFile) {
        return ResponseEntity.ok(signService.create(dto, videoFile));
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

    @PostMapping("/by-translation")
    public ResponseEntity<Page<SignGetListDto>> getByTranslation(@RequestBody @Valid SearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(signService.getByTranslation(dto.getSearch(), pageable));
    }

    @PostMapping("/category-search")
    public ResponseEntity<Page<SignGetListDto>> getByCategorySearch(@RequestBody @Valid SearchEntityDto dto, Pageable pageable) {
        return ResponseEntity.ok(signService.getByCategoryAndSearch(dto.getEntityId(), dto.getSearch(), pageable));
    }

    @PostMapping("/collection-search")
    public ResponseEntity<Page<SignGetListDto>> getByPrivateCollectionSearch(@RequestBody @Valid SearchEntityDto dto, Pageable pageable) {
        return ResponseEntity.ok(signService.getByPrivateCollectionAndSearch(dto.getEntityId(), dto.getSearch(), pageable));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<SignGetListDto>> search(@RequestBody @Valid SignSearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(signService.search(dto, pageable));
    }
}
