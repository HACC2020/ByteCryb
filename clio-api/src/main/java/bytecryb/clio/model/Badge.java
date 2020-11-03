package bytecryb.clio.model;

import javax.persistence.Column;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import jdk.jfr.events.CertificateId;

@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "badge_id_generator")
    @SequenceGenerator(name="badge_id_generator", sequenceName = "badge_req")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(score = "score")
    private int score;

    public Badge() {
        super();
    }

    public Badge(String name) {
        super();
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int setScore(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }

}