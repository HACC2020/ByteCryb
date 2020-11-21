package bytecryb.clio.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="awards")
public class Award {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "award_id_generator")
    @SequenceGenerator(name = "award_id_generator", sequenceName = "award_seq", initialValue = 3)
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private CustomUser user;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "badge_id")
    private Badge badge;

    @Getter
    @Setter
    @Column(name = "date")
    private Date date = new Date();

    public Award() {
        super();
    }

    public Award(CustomUser user, Badge badge) {
        super();
        this.user = user;
        this.badge = badge;
    }
}