package bytecryb.clio.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name =  "categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cat_id_generator")
    @SequenceGenerator(name="cat_id_generator", sequenceName = "cat_seq")
    @Column(name = "id", updatable = false, nullable = false)
	private long id;
	
	@Column(name = "name", nullable = false)
	private String name;

	@OneToMany(mappedBy = "category")
	private List<Job> jobs;

	public Category(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}
	
}
