package bytecryb.clio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bytecryb.clio.model.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    List<Score> findByUserId(long userId);

    @Query(value = "SELECT s.user_id FROM Scores s", nativeQuery = true)
    List<Score> findAllMonthlyScores();
}

	/*
	Select EmployeeID, SUM(InvoiceAmount) 
	From Calls
	Group by EmployeeID
	*/
