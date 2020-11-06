package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Award;

@Repository
public interface AwardRepository extends JpaRepository<Award, Long> {
    
}