package bytecryb.clio.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;



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

    @Column(name = "score")
    private int score;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "badges")
    private List<CustomUser> users = new ArrayList<>();

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

    public void setScore(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }

    public List<CustomUser> getUsers() {
        return users;
    }

    public void setUsers(List<CustomUser> users) {
        this.users = users;
    }

}