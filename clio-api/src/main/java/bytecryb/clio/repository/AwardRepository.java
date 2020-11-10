package bytecryb.clio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Award;

@Repository
public interface AwardRepository extends JpaRepository<Award, Long> {
    @Query(value = "SELECT * FROM Award a WHERE a.user_id = ?1", nativeQuery = true)
    List<Award> findByUserId(Long userId);
}