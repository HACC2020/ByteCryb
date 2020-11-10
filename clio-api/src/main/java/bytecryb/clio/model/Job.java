package bytecryb.clio.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "jobs")
public class Job {

	@Id
	@Getter
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_id_generator")
	@SequenceGenerator(name = "job_id_generator", sequenceName = "job_seq")
	@Column(name = "id", updatable = false, nullable = false)
	private long id;

	@Getter
	@Setter
	@Column(name = "name", nullable = false)
	private String name;

	@Getter
	@Setter
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "category_id", referencedColumnName = "id")
	private Category category;

	@Getter
	@Setter
	@Column(name = "status")
	private int status;

	@Getter
	@Setter
	@Column(name = "xml_id")
	private Long xmlId;

	@Getter
	@Setter
	@Column(name = "num_indexed")
	private int indexed;

	@Getter
	@Setter
	@Column(name = "size", nullable = false)
	private int size;

	public Job(String name, int status, String xml, int indexed, int size) {
		super();
		this.name = name;
		this.status = status;
		this.xmlId = xmlId;
		this.indexed = indexed;
		this.size = size;
	}
}
