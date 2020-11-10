package bytecryb.clio.model;

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


@Entity
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "pdf")
public class PDF {

	@Id
	@Getter
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pdf_id_generator")
	@SequenceGenerator(name = "pdf_id_generator", sequenceName = "pdf_id_seq")
	@Column(name = "id", updatable = false, nullable = false)
	private long id;

	@Getter
	@Setter
	@Column(name = "name")
	private String name;

	@Getter
	@Setter
	@Column(name = "path", nullable = false)
	private String path;

	@Lob
	@Column(name = "data")
	private byte[] data;


	public PDF() {
		super();
	}

	public PDF(String name, String path) {
		super();
		this.name = name;
		this.path = path;
	}

}
