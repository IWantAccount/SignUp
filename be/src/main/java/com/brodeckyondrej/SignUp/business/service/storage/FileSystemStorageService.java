package com.brodeckyondrej.SignUp.business.service.storage;

import com.brodeckyondrej.SignUp.config.StorageProperties;
import com.brodeckyondrej.SignUp.exception.StorageException;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import jakarta.annotation.PostConstruct;
import jakarta.validation.constraints.NotNull;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import java.util.UUID;

import static java.nio.file.StandardCopyOption.ATOMIC_MOVE;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

//Inspiroval jsem se tady https://spring.io/guides/gs/uploading-files
@Service
public class FileSystemStorageService implements StorageService{

    private final Path rootDirectory;

    public FileSystemStorageService(StorageProperties storageProperties) {
        rootDirectory = storageProperties.location().toAbsolutePath().normalize();
     }

    @Override
    @PostConstruct
    public void init() {
        try{
            Files.createDirectories(rootDirectory);
        }
        catch (IOException exception){
            throw new StorageException("Cannot init storage dir" + rootDirectory + exception.getMessage());
        }
    }

    @Override
    public String store(@NotNull MultipartFile file) {

        if(file.isEmpty()){
            throw new ValidationException("File is empty");
        }

        String original = Objects.requireNonNullElse(file.getOriginalFilename(), "file");
        String extension = extractExtension(original);
        String key = UUID.randomUUID() + extension;
        Path destination = resolveInsideRoot(key) ;

        try (InputStream inputStream = file.getInputStream()){

            Files.copy(inputStream, destination, REPLACE_EXISTING);

            return key;
        }
        catch(IOException exception){
            throw new StorageException(exception.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try{
            Path filePath = resolveInsideRoot(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists() && resource.isReadable()){
                return resource;
            }

            throw new StorageException("File not found or damaged");

        }
        catch(Exception exception){
            throw new StorageException(exception.getMessage());
        }
    }

    @Override
    public void delete(String filename) {
        Path path = resolveInsideRoot(filename);
        try{
            Files.deleteIfExists(path);
        }
        catch(Exception exception){
            throw new StorageException("Failed to delete file " + filename + "\n" + exception.getMessage());
        }
    }

    @Override
    public void replace(String filename, @NotNull MultipartFile file) {
        if(file.isEmpty()){
            throw new ValidationException("File is empty");
        }

        Path path = resolveInsideRoot(filename);
        if(!Files.exists(path)){
            throw new StorageException("File not found");
        }

        try{
            Path temp = Files.createTempFile(rootDirectory, "upload-", ".tmp");
            file.transferTo(temp.toFile());
            Files.move(temp, path, REPLACE_EXISTING, ATOMIC_MOVE);
        }
        catch(IOException exception){
            throw new StorageException("Failed to replace a file" + "\n" + exception.getMessage());
        }
    }

    private Path resolveInsideRoot(String relativeKey) {
        Path candidate = rootDirectory.resolve(relativeKey).normalize();
        if (!candidate.startsWith(rootDirectory.normalize())) {
            throw new StorageException("Invalid path: " + relativeKey);
        }
        return candidate;
    }

    protected static String extractExtension(String name) {
        int i = name.lastIndexOf('.');
        if (i < 0 || i == name.length() - 1) return "";
        String ext = name.substring(i);
        if (ext.length() > 10 || ext.contains("/") || ext.contains("\\")) return "";
        return ext.toLowerCase();
    }
}
