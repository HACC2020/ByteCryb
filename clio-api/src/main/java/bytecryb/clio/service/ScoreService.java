package bytecryb.clio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bytecryb.clio.model.Score;
import bytecryb.clio.repository.ScoreRepository;

@Service
public class ScoreService {

    @Autowired
	private ScoreRepository scoreRepo;

	public Score save(Score score) {
		Score newScore = new Score();
        newScore.setUserId(score.getUserId());
        newScore.setDay(0);
        newScore.setMonth(0);
        newScore.setYear(0);
        newScore.setScore(0);
        return scoreRepo.save(newScore);
	}

    
}
