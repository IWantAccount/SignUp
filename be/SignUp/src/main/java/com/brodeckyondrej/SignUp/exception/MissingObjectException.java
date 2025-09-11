package com.brodeckyondrej.SignUp.exception;
/**
 * Thrown when object is not found*/
public class MissingObjectException extends RuntimeException {
    public MissingObjectException(String message) {
        super(message);
    }
}
