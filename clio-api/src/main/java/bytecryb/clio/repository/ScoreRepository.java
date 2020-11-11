package bytecryb.clio.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    List<Score> findByUserId(long userId);

    @Query(value = "SELECT s.user_id, SUM(s.day) FROM Scores s GROUP BY s.user_id ORDER BY SUM(s.day) DESC", nativeQuery = true)
    List<Object[]> findAllDailyScores();

    @Query(value = "SELECT s.user_id, SUM(s.month) FROM Scores s GROUP BY s.user_id ORDER BY SUM(s.month) DESC", nativeQuery = true)
    List<Object[]> findAllMonthlyScores();

}

	/*
	Select EmployeeID, SUM(InvoiceAmount) 
	From Calls
	Group by EmployeeID
	*/
