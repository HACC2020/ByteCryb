package bytecryb.clio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNSUPPORTED_MEDIA_TYPE)
public class UnsupportedFileException extends Exception {

    private static final long serialVersionUID = 1L;

    public UnsupportedFileException(String message) {
        super(message);
    }

}
