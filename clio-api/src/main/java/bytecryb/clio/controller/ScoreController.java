package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.ResultScore;
import bytecryb.clio.model.Score;
import bytecryb.clio.repository.ScoreRepository;
import bytecryb.clio.repository.UserRepository;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

	@Autowired
	private ScoreRepository scoreRepo;

	@Autowired
	private UserRepository userRepo;

	// GET DAILY
	@GetMapping("/daily")
	public ResponseEntity<List<ResultScore>> getDailyTopScores() {
		
		List<Score> query = this.scoreRepo.findAll(Sort.by("day").descending());

		List<ResultScore> result = new ArrayList<ResultScore>();

		Iterator<Score> scoreIterator = query.iterator();

		int i = 1;
		while (scoreIterator.hasNext() && i < 10) {
			Score tmp = scoreIterator.next();
			long tmpUserId = tmp.getUserId();
			CustomUser user = this.userRepo.findById(tmpUserId);
			result.add(new ResultScore(i, user.getUsername(), tmp.getDay()));
			i++;
		}
		return ResponseEntity.ok().body(result);
	}

	// GET MONTHLY
	@GetMapping("/month")
	public ResponseEntity<List<ResultScore>> getMonthlyTopScores() {
		
		List<Score> query = this.scoreRepo.findAll(Sort.by("month").descending());

		List<ResultScore> result = new ArrayList<ResultScore>();

		Iterator<Score> scoreIterator = query.iterator();

		int i = 1;
		while (scoreIterator.hasNext() && i < 10) {
			Score tmp = scoreIterator.next();
			long tmpUserId = tmp.getUserId();
			CustomUser user = this.userRepo.findById(tmpUserId);
			result.add(new ResultScore(i, user.getUsername(), tmp.getMonth()));
			i++;
		}
		return ResponseEntity.ok().body(result);
	}

	// GET ALL TIME
	@GetMapping("/alltime")
	public ResponseEntity<List<ResultScore>> getAllTimeTopScores() {
		
		List<Score> query = this.scoreRepo.findAll(Sort.by("score").descending());

		List<ResultScore> result = new ArrayList<ResultScore>();

		Iterator<Score> scoreIterator = query.iterator();

		int i = 0;
		while (scoreIterator.hasNext() && 1 < 10) {
			Score tmp = scoreIterator.next();
			long tmpUserId = tmp.getUserId();
			CustomUser user = this.userRepo.findById(tmpUserId);
			result.add(new ResultScore(i, user.getUsername(), tmp.getScore()));
			i++;
		}
		return ResponseEntity.ok().body(result);
	}
}
