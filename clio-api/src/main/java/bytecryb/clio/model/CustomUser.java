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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class CustomUser {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_generator")
	@SequenceGenerator(name = "user_id_generator", sequenceName = "user_req", initialValue = 5)
	@Column(name = "id", updatable = false, nullable = false)
	private long userId;

    @Column(name = "username")
	private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToOne()
	@JoinColumn(name = "role_id") //creates foreign key column
	private Role role;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "awards", //name of table
        joinColumns = { @JoinColumn(name = "user_id") }, //owner column
        inverseJoinColumns = { @JoinColumn(name = "badge_id") } 
    )
    private List<Badge> badges = new ArrayList<>();

	public CustomUser() {
		super();
	}

	public CustomUser(String username, String email, String password, String firstName, String lastName, Role role) {
		super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
    
    public CustomUser(String username, String email, String password) {
		super();
        this.username = username;
        this.email = email;
        this.password = password;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Badge> getBadges() {
        return badges;
    }

    public void setBadges(List<Badge> badges) {
        this.badges = badges;
    }
}