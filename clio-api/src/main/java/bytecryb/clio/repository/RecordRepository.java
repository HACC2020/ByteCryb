package bytecryb.clio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findByJobId(Long jobId);

    @Query(value = "SELECT * FROM Records r WHERE r.submitted = true AND r.approved = false", nativeQuery = true)
    List<Record> findBySubmittedUnapproved();

    @Query(value = "SELECT * FROM Records r WHERE r.submitted = true AND r.approved = false AND r.job_id =?1", nativeQuery = true)
    List<Record> findBySubmittedUnapprovedJobId(Long jobId);

    Record findFirstByJobId(Long id);

}
