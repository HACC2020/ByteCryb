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

    Score findByUserId(long userId);

    @Query(value = "select s.user_id, sum(s.month) from Scores s group by s.user_id", nativeQuery = true)
    List<Object[]> findAllMonthlyScores();
}

	/*
	Select EmployeeID, SUM(InvoiceAmount) 
	From Calls
	Group by EmployeeID
	*/
