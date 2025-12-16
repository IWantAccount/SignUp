package com.brodeckyondrej.SignUp.exception;

public class NameNotUniqueException extends RuntimeException {
    public NameNotUniqueException(String message) {
        super(message);
    }
}
