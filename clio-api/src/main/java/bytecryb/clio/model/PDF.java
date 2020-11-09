package bytecryb.clio.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pdf")
public class PDF {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pdf_id_generator")
	@SequenceGenerator(name = "pdf_id_generator", sequenceName = "pdf_id_seq")
	@Column(name = "id", updatable = false, nullable = false)
	private long id;

	@Column(name = "name")
	private String name;

	@Lob
	@Column(name = "data")
	private byte[] data;


	public PDF() {
		super();
	}

	public PDF(String name, byte[] data) {
		super();
		this.name = name;
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public byte[] getData() {
		return data;
	}

	public void setPdf(byte[] data) {
		this.data = data;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
