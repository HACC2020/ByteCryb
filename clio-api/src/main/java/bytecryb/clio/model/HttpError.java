package bytecryb.clio.model;

import java.util.Date;

public class HttpError {

    private Date timestamp;
    private String message;
    private String details;

    public HttpError(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }

}
