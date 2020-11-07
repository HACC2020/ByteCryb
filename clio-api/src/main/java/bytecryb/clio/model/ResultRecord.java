package bytecryb.clio.model;

public class ResultRecord {
    private long recordId;

    private String xmlPath;

    private String pdfLink;

    //0 = incomplete, 1 = in progress, 2 = complete
    private int status;

    public ResultRecord() {
        super();
    }

    public ResultRecord(long recordId, String xmlPath, String pdfLink, int status) {
        super();
        this.xmlPath = xmlPath;
        this.pdfLink = pdfLink;
        this.recordId = recordId;
        this.status = status;
    }

    public long getRecordId() {
        return recordId;
    }

    public void setRecordId(long recordId) {
        this.recordId = recordId;
    }

    public String getXmlPath() {
        return xmlPath;
    }

    public void setXmlPath(String xmlPath) {
        this.xmlPath = xmlPath;
    }

    public String getpdfLink() {
        return pdfLink;
    }

    public void setPdfLink(String pdfLink) {
        this.pdfLink = pdfLink;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

