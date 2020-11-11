package bytecryb.clio.model;

public class ResultScore {

	private int rank;

	private long userId;

	private String username;
	
	public int score;

	public ResultScore() {
		super();
	}

	public ResultScore(int rank, long userId, String username, int score) {
		super();
		this.rank = rank;
		this.userId = userId;
		this.username = username;
		this.score = score;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

}
