package bytecryb.clio.handler;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import bytecryb.clio.exception.FileException;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.exception.UnsupportedFileException;
import bytecryb.clio.model.HttpError;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FileException.class)
    public ResponseEntity<?> relayFileException(FileException e, WebRequest request) {
        HttpError error = new HttpError(new Date(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> relayResourceNotFoundException(ResourceNotFoundException e, WebRequest request) {
        HttpError error = new HttpError(new Date(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnsupportedFileException.class)
    public ResponseEntity<?> relayUnsupportedFileException(UnsupportedFileException e, WebRequest request) {
        HttpError error = new HttpError(new Date(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> relayException(Exception e, WebRequest request) {
        HttpError error = new HttpError(new Date(), e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
