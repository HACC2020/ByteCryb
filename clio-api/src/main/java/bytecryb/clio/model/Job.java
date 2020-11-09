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
	@Column(name = "cat_id")
	private long categoryId;

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

	@Getter
	@Setter
	@OneToMany(cascade=CascadeType.ALL, mappedBy = "job")
	Set<Record> records;

	public Job(String name, long categoryId, int status, String xml, int indexed, int size) {
		super();
		this.name = name;
		this.categoryId = categoryId;
		this.status = status;
		this.xmlId = xmlId;
		this.indexed = indexed;
		this.size = size;
	}
}
