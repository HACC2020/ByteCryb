package bytecryb.clio.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Job {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_id_generator")
    @SequenceGenerator(name="job_id_generator", sequenceName = "job_seq")
    @Column(name = "id", updatable = false, nullable = false)
	private long id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "cat_id")
	private long categoryId;
	
	@Column(name = "status")
	private int status;
	
	@Column(name = "xml")
	private String xml;
	
	@Column(name = "num_indexed")
	private int indexed;
	
	@Column(name = "size", nullable = false)
	private int size;

	public Job(String name, long categoryId, int status, String xml, int indexed, int size) {
		super();
		this.name = name;
		this.categoryId = categoryId;
		this.status = status;
		this.xml = xml;
		this.indexed = indexed;
		this.size = size;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getXml() {
		return xml;
	}

	public void setXml(String xml) {
		this.xml = xml;
	}

	public int getIndexed() {
		return indexed;
	}

	public void setIndexed(int indexed) {
		this.indexed = indexed;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

}
