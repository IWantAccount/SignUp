package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.api.controller.universal.EntityController;
import com.brodeckyondrej.SignUp.business.dto.sign.*;
import com.brodeckyondrej.SignUp.business.service.sign.SignService;
import com.brodeckyondrej.SignUp.persistence.entity.Sign;
import com.brodeckyondrej.SignUp.security.annotations.AtLeastTeacher;
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

    @PostMapping("/search")
    public ResponseEntity<Page<SignGetListDto>> search(@RequestBody @Valid SignSearchDto dto, Pageable pageable) {
        return ResponseEntity.ok(signService.search(dto, pageable));
    }

    @Override
    @PostMapping
    @AtLeastTeacher
    public ResponseEntity<SignGetDetailDto> create(@Valid @RequestBody SignCreateDto dto) {
        return ResponseEntity.ok(signService.create(dto));
    }

    @Override
    @PutMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<SignGetDetailDto> update(@Valid @RequestBody SignUpdateDto dto, @PathVariable UUID id) {
        return super.update(dto, id);
    }

    @Override
    @DeleteMapping("/{id}")
    @AtLeastTeacher
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        return super.delete(id);
    }
}
