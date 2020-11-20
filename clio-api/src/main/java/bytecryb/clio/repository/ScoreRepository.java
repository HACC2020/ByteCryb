package bytecryb.clio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    List<Score> findByUserId(long userId);

    // finds total score of a given user
    @Query(value = "SELECT SUM(s.score) FROM Scores s WHERE s.user_id = ?1", nativeQuery = true)
    int findTotalScoreByUserId(long userId);

    @Query(value = "SELECT s.user_id, SUM(s.score) FROM Scores s WHERE s.date = CURRENT_DATE GROUP BY s.user_id ORDER BY SUM(s.score) DESC", nativeQuery = true)
    List<Object[]> findAllDailyScores();

    @Query(value = "SELECT s.user_id, SUM(s.score) FROM Scores s WHERE EXTRACT(MONTH FROM s.date) = EXTRACT(MONTH FROM CURRENT_DATE) GROUP BY s.user_id ORDER BY SUM(s.score) DESC", nativeQuery = true)
    List<Object[]> findAllMonthlyScores();

    @Query(value = "SELECT s.user_id, SUM(s.score) FROM Scores s WHERE CAST(EXTRACT(YEAR FROM s.date) AS INT) = ?1 GROUP BY s.user_id ORDER BY SUM(s.score) DESC", nativeQuery = true)
    List<Object[]> findAllYearlyScores(int year);

    @Query(value = "SELECT s.user_id, SUM(s.score) FROM Scores s GROUP BY s.user_id ORDER BY SUM(s.score) DESC", nativeQuery = true)
    List<Object[]> findAllScores();

}

	/*
	Select EmployeeID, SUM(InvoiceAmount) 
	From Calls
	Group by EmployeeID
	*/
