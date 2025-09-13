package com.brodeckyondrej.SignUp.business.service.storage;

import com.brodeckyondrej.SignUp.config.StorageProperties;
import com.brodeckyondrej.SignUp.config.VideoProperties;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Service
public class FileSystemVideoStorage extends FileSystemStorageService{
    private final DataSize maxSize;
    private final Set<String> allowedExtensions;

    public FileSystemVideoStorage(StorageProperties storageProperties, VideoProperties videoProperties) {
        super(storageProperties);
        maxSize = videoProperties.maxSize();
        allowedExtensions = videoProperties.allowedTypes();
    }

    @Override
    public void replace(String filename, @NotNull MultipartFile file){
        validate(file);
        super.replace(filename, file);
    }

    @Override
    public String store(@NotNull MultipartFile file) {
        validate(file);
        return super.store(file);
    }


    private void validate(MultipartFile file) {
        validateSize(file.getSize());
        validateExtension(file.getOriginalFilename());
    }

    private void validateSize(long bytes) {
        long maxBytes = maxSize.toBytes();
        if(bytes > maxBytes) {
            throw new ValidationException("Size exceeds max size: " + maxSize);
        }
    }

    private void validateExtension(String name) {
        String extension = extractExtension(name);
        if(!allowedExtensions.contains(extension)){
            throw new ValidationException("Extension not allowed: " + extension);
        }
    }
}
