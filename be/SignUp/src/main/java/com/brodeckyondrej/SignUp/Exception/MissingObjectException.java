package com.brodeckyondrej.SignUp.Exception;
/**
 * Thrown when object is not found*/
public class MissingObjectException extends RuntimeException {
    public MissingObjectException(String message) {
        super(message);
    }
}
