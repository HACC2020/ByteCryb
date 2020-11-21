package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "profile_pic")
public class ProfilePic {

    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pic_id_generator")
    @SequenceGenerator(name = "pic_id_generator", sequenceName = "pic_id_seq")
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Getter
    @Setter
    @Column(name = "path", nullable = false)
    private String path;

    public ProfilePic(String path) {
        this.path = path;
    }
}
