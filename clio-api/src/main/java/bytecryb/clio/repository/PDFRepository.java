package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.PDF;

@Repository
public interface PDFRepository extends JpaRepository<PDF, Long> {

}
