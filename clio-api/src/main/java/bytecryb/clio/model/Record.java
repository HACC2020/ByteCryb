package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@EqualsAndHashCode
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
@Table(name = "records")
public class Record {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "record_id_generator")
    @SequenceGenerator(name = "record_id_generator", sequenceName = "record_seq")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    @Getter
    @Setter
    @Column(name = "pdf_id", nullable = false)
    private long pdfId;

    @Setter
    @Column(name = "checked_out", nullable = false)
    private boolean checkedOut;

    @Setter
    @Column(name = "submitted", nullable = false)
    private boolean submitted;

    @Setter
    @Column(name = "approved", nullable = false)
    private boolean approved;

    @Getter
    @Setter
    @Type(type = "jsonb")
    @Column(name = "json", columnDefinition = "jsonb")
    private String json;

    public Record() {
        super();
        //this.jobId = -1;
        this.pdfId = -1;
        this.checkedOut = false;
        this.submitted = false;
        this.approved = false;
        this.json = "";
    }

    public Record(long jobId, long pdfId, boolean checkedOut, boolean submitted, boolean approved, String json) {
        super();
        //this.jobId = jobId;
        this.pdfId = pdfId;
        this.checkedOut = checkedOut;
        this.submitted = submitted;
        this.approved = approved;
        this.json = json;
    }

    public boolean isCheckedOut() {
        return this.checkedOut;
    }

    public boolean isSubmitted() {
        return this.submitted;
    }

    public boolean isApproved() {
        return this.approved;
    }
}