package bytecryb.clio.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_generator")
    @SequenceGenerator(name="role_id_generator", sequenceName = "role_req")
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column(name = "rolename")
    private String roleName;

    @OneToMany(cascade=CascadeType.ALL, mappedBy = "role")
    private Set<CustomUser> user;


    public Role() {
        super();
    }

    public Role(String roleName) {
        super();
        this.roleName = roleName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return roleName;
    }

    public void setName(String roleName) {
        this.roleName = roleName;
    }
}