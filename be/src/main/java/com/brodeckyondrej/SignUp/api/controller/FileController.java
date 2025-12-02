package com.brodeckyondrej.SignUp.api.controller;

import com.brodeckyondrej.SignUp.business.service.storage.StorageService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;


@RestController
@RequestMapping("/file")
//TODO tohle dej pryč až zavedeš spring security
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FileController {

    private final StorageService storageService;

    public FileController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/url-req/{name}")
    public ResponseEntity<Resource> getFileTemp(@PathVariable String name) {
        Resource resource = storageService.load(name);
        String contentType;
        if (name.toLowerCase().endsWith(".webm")) {
            contentType = "video/webm";
        } else if (name.toLowerCase().endsWith(".mp4")) {
            contentType = "video/mp4";
        } else {
            contentType = "application/octet-stream";
        }

        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
