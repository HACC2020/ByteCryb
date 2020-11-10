package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.ResultScore;
import bytecryb.clio.model.Score;
import bytecryb.clio.repository.ScoreRepository;

@RestController
@RequestMapping("/api/api")
public class ScoreController {
	@Autowired
	private ScoreRepository scoreRepo;

	// GET weekly top scores

	// GET monthly top scores

	// GET yearly top scores

	// temp endpoint
	@GetMapping("/scores/weekly")
	public ResponseEntity<List<ResultScore>> getWeeklyTopScores() {
		List<Score> query = this.scoreRepo.findAll();

		List<ResultScore> result = new ArrayList<ResultScore>();

		Iterator<Score> scoreIterator = query.iterator();

		while (scoreIterator.hasNext()) {
			Score tmp = scoreIterator.next();
			result.add(new ResultScore(1, "fake", tmp.getScore()));
		}

		return ResponseEntity.ok().body(result);
	}
}
