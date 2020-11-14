package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "badges")
public class Badge {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "badge_id_generator")
    @SequenceGenerator(name = "badge_id_generator", sequenceName = "badge_seq")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Getter
    @Setter
    @Column(name = "name", nullable = false)
    private String name;

    @Getter
    @Setter
    @Column(name = "score")
    private int score;

    @Getter
    @Setter
    @Column(name = "description")
    private String description;

    @Getter
    @Setter
    @Column(name = "color")
    private String color;

    public Badge(String name, int score) {
        super();
        this.name = name;
    }

}