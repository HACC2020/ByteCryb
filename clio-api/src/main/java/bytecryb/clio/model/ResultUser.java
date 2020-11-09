package bytecryb.clio.model;

public class ResultUser {
    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
	private String roleName;
	private String authToken;

    public ResultUser() {
        super();
    }
    
	public ResultUser(long id, String username, String firstName, String lastName, String email, String roleName, String authToken) {
		super();
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
		this.roleName = roleName;
		this.authToken = authToken;		
	}

	public ResultUser(long id, String username, String firstName, String lastName, String email, String roleName) {
		super();
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
		this.roleName = roleName;
	}
	
	public ResultUser(long id, String username, String email, String roleName) {
		super();
        this.id = id;
        this.username = username;
        this.email = email;
		this.roleName = roleName;
    }

    public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoleName() {
		return roleName;
	}

	public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

}