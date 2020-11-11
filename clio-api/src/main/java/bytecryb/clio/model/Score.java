package bytecryb.clio.model;

import java.util.Date;

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

@NoArgsConstructor

@EqualsAndHashCode
@ToString
@Entity
@Table(name = "scores")
public class Score {

	@Id
	@Getter
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "score_id_generator")
	@SequenceGenerator(name = "score_id_generator", sequenceName = "score_seq", initialValue = 5)
	@Column(name = "id", updatable = false, nullable = false)
	private long id;

	@Getter
	@Setter
	@Column(name = "user_id")
	private long userId;

	@Getter
	@Setter
	@Column(name = "date")
	private String date;

	@Getter
	@Setter
	@Column(name = "score")
	private int score;

	public Score(long userId, String date, int day, int month, int year, int score) {
		super();
		this.userId = userId;
		this.date = date;
		this.score = score;
	}

}
