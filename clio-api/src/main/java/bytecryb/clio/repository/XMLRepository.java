package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.XML;

@Repository
public interface XMLRepository extends JpaRepository<XML, Long> {

}
