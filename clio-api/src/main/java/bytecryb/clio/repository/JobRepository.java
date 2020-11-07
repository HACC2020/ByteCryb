package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>{

}
