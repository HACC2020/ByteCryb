package bytecryb.clio.model;

public class ResultScore {

	private int rank;

	private String username;
	
	public int score;

	public ResultScore() {
		super();
	}

	public ResultScore(int rank, String username, int score) {
		super();
		this.rank = rank;
		this.username = username;
		this.score = score;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
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
