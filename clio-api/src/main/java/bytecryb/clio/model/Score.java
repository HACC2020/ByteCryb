package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;

@Entity
@AllArgsConstructor
@Table(name = "scores")
public class Score {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "score_id_generator")
	@SequenceGenerator(name = "score_id_generator", sequenceName = "score_seq", initialValue = 5)
	@Column(name = "id", updatable = false, nullable = false)
	private long id;

	@Column(name = "user_id")
	private long userId;

	@Column(name = "day")
	private int day;

	@Column(name = "month")
	private int month;

	@Column(name = "year")
	private int year;

	@Column(name = "score")
	private int score;

	public Score() {
		super();
	}

	public Score(long userId, int day, int month, int year, int score) {
		super();
		this.userId = userId;
		this.day = day;
		this.month = month;
		this.year = year;
		this.score = score;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

}
