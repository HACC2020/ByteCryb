package bytecryb.clio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score findByUserId(Long userId);

    @Query("SELECT DISTINCT SUM(s.score) From Score s WHERE s.userId = ?1 GROUP BY s.userId")
    Object getTotalScoreByUserId(Long userId);
}
