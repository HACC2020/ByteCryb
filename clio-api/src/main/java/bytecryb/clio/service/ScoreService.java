package bytecryb.clio.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bytecryb.clio.model.Score;
import bytecryb.clio.repository.ScoreRepository;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepo;
    
    //DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date today = new Date();

	public Score save(Score score) {
		Score newScore = new Score();
        newScore.setUserId(score.getUserId());
        newScore.setDate(today);//formatter.format(today)
        newScore.setScore(0);
        return scoreRepo.save(newScore);
	}

    
}
