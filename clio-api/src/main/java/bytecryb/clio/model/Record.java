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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "record_id_generator")
    @SequenceGenerator(name = "record_id_generator", sequenceName = "record_seq")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column(name = "job_id")
    private long jobId;

    @Column(name = "status")
    private int status;

    @Column(name = "pdf_id")
    private String pdfLink;

    public Record() {
        super();
    }

    public Record(long jobId, int status, String pdfLink) {
        super();
        this.jobId = jobId;
        this.status = status;
        this.pdfLink = pdfLink;
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

    public String getPdfLink() {
        return pdfLink;
    }

    public void setPdfLink(String pdfLink) {
        this.pdfLink = pdfLink;
    }

}