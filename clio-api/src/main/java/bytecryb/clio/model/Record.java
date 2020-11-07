package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "records")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_generator")
    @SequenceGenerator(name="role_id_generator", sequenceName = "role_seq")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column(name = "job_id")
    private long jobId;

    @Column(name = "status")
    private int status;

    @Column(name = "pdf_link")
    private String pdfLink;

    @Column(name = "file_name")
    private String fileName;

    public Record() {
        super();
    }

    public Record(long jobId, int status, String pdfLink, String fileName) {
        super();
        this.jobId = jobId;
        this.status = status;
        this.pdfLink = pdfLink;
        this.fileName = fileName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getJobId() {
        return jobId;
    }

    public void setJobId(long jobId) {
        this.jobId = jobId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getPdfLink(){
        return pdfLink;
    }

    public void setPdfLink(String pdfLink) {
        this.pdfLink = pdfLink;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }


}