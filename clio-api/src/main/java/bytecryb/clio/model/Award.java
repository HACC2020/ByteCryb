package bytecryb.clio.model;

import javax.persistence.Column;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="awards")
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "award_id_generator")
    @SequenceGenerator(name = "award_id_generator", sequenceName = "award_req")
    private long id;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "badge_id")
    private long badgeId;

    @Column(name = "date")
    private Date date;

    public Award() {
        super();
    }

    public Award(long userId, long badgeId, Date date) {
        super();
        this.userId = userId;
        this.badgeId = badgeId;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBadgeId() {
        return badgeId;
    }

    public void setBadgeId(long badgeId) {
        this.badgeId = badgeId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}