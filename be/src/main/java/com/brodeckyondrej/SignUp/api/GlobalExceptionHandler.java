package com.brodeckyondrej.SignUp.api;
import com.brodeckyondrej.SignUp.exception.MissingObjectException;
import com.brodeckyondrej.SignUp.exception.ValidationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MissingObjectException.class})
    public ResponseEntity<ProblemDetail> notFound(MissingObjectException e) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        pd.setTitle("Nenalezeno");
        pd.setDetail(e.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(pd);
    }

    @ExceptionHandler({ValidationException.class})
    public ResponseEntity<ProblemDetail> validation(ValidationException e) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Chybný vstup");
        pd.setDetail(e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(pd);
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<ProblemDetail> integrity(DataIntegrityViolationException e) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("Nelze smazat. Objekt není prázdný.");
        pd.setDetail(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(pd);
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<ProblemDetail> badCredentials(BadCredentialsException e) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        pd.setTitle(e.getMessage());
        pd.setDetail(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(pd);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ProblemDetail> other(Exception e) {
        ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        pd.setTitle("Neznámá chyba");
        pd.setDetail(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(pd);
    }

}
