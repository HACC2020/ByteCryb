package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bytecryb.clio.model.Job;

public interface JobRepository extends JpaRepository<Job, Long>{

}
