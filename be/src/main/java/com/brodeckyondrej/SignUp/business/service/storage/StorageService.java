package com.brodeckyondrej.SignUp.business.service.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    void init();

    /**
     * @param file file to store
     * @return filename
     */
    String store(MultipartFile file);

    /**
     * @param filename
     * @return returns file as Resource or throws MissingObjectException
     */
    Resource load(String filename);

    /**
     * Deletes file with given filename. If none is found MissingObjectException is not thrown
     * @param filename
     */
    void delete(String filename);

    /**
     * Replaces file with given filename with new file
     * @param filename
     * @param file
     */
    void replace(String filename, MultipartFile file);
}
