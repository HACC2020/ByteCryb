package bytecryb.clio.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class ResultUser {
	@Getter
	@Setter
	private long id;

	@Getter
	@Setter
	private String username;

	@Getter
	@Setter
	private String firstName;

	@Getter
	@Setter
	private String lastName;

	@Getter
	@Setter
	private String email;

	@Getter
	@Setter
	private String roleName;

	@Getter
	@Setter
	private String authToken;

	public ResultUser(long id, String username, String email, String roleName) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.roleName = roleName;
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

	public ResultUser(long id, String username, String firstName, String lastName, String email, String roleName,
			String authToken) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.roleName = roleName;
		this.authToken = authToken;
	}

}