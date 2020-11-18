package bytecryb.clio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class SignupTakenException extends Exception {

    private static final long serialVersionUID = 1L;

    public SignupTakenException(String message) {
        super(message);
    }
}
