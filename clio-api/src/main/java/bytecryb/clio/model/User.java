package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_generator")
	@SequenceGenerator(name = "user_id_generator", sequenceName = "user_req")
	@Column(name = "id", updatable = false, nullable = false)
	private long userId;

	@Column(name = "username")
	private String username;

    @Column(name = "email")
    private String email;

	@Column(name = "salt")
	private String salt;

	@Column(name = "pwd_hash")
	private String pwd_hash;

	@Column(name = "role_id")
	private long roleId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

	public User() {
		super();
	}

	public User(String username, String email, String salt, String pwd_hash, long roleId, String firstName, String lastName) {
		super();
        this.username = username;
        this.email = email;
        this.salt = salt;
        this.pwd_hash = pwd_hash;
        this.roleId = roleId;
        this.firstName = firstName;
        this.lastName = lastName;
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

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getPwdHash() {
        return pwd_hash;
    }

    public void setPwdHash(String pwd_hash) {
        this.pwd_hash = pwd_hash;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
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
}