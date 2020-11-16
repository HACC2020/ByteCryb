package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.Score;
import bytecryb.clio.repository.ScoreRepository;
import bytecryb.clio.repository.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class ScoreController {
	@Autowired
	private ScoreRepository scoreRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ObjectMapper mapper;

	/*
	 * 
	 * // GET DAILY
	 * 
	 * @GetMapping("/scores/daily") public ResponseEntity<List<ResultScore>>
	 * getDailyTopScores(HttpServletRequest request) { List<Score> query =
	 * this.scoreRepo.findAll(Sort.by("day").descending()); List<ResultScore> result
	 * = new ArrayList<ResultScore>();
	 * 
	 * String jwtToken = extractJwtFromRequest(request); String username =
	 * jwtUtil.getUsernameFromToken(jwtToken); CustomUser curUser =
	 * this.userRepo.findByUsername(username); List<Score> userScore =
	 * this.scoreRepo.findByUserId(curUser.getUserId()); result.add(new
	 * ResultScore(0, username, userScore.getDay()));
	 * 
	 * Iterator<Score> scoreIterator = query.iterator();
	 * 
	 * int i = 1; while (scoreIterator.hasNext() && i < 10) { Score tmp =
	 * scoreIterator.next(); long tmpUserId = tmp.getUserId(); CustomUser user =
	 * this.userRepo.findById(tmpUserId); result.add(new ResultScore(i,
	 * user.getUsername(), tmp.getDay())); i++; } return
	 * ResponseEntity.ok().body(result); }
	 * 
	 * // GET MONTHLY
	 * 
	 * @GetMapping("/scores/month") public ResponseEntity<List<ResultScore>>
	 * getMonthlyTopScores(HttpServletRequest request) {
	 * 
	 * List<Score> query = this.scoreRepo.findAll(Sort.by("month").descending());
	 * List<ResultScore> result = new ArrayList<ResultScore>();
	 * 
	 * String jwtToken = extractJwtFromRequest(request); String username =
	 * jwtUtil.getUsernameFromToken(jwtToken); CustomUser curUser =
	 * this.userRepo.findByUsername(username); List<Score> userScore =
	 * this.scoreRepo.findByUserId(curUser.getUserId()); result.add(new
	 * ResultScore(0, username, userScore.getMonth()));
	 * 
	 * Iterator<Score> scoreIterator = query.iterator();
	 * 
	 * int i = 1; while (scoreIterator.hasNext() && i < 10) { Score tmp =
	 * scoreIterator.next(); long tmpUserId = tmp.getUserId(); CustomUser user =
	 * this.userRepo.findById(tmpUserId); result.add(new ResultScore(i,
	 * user.getUsername(), tmp.getMonth())); i++; } return
	 * ResponseEntity.ok().body(result); }
	 * 
	 */

	// GET ALL SCORES
	@GetMapping("/scores")
	public ResponseEntity<List<Score>> allScores() {
		List<Score> result = this.scoreRepo.findAll();
		return ResponseEntity.ok().body(result);
	}

	// GET TOP 10 DAILY
	@GetMapping("/scores/daily")
	public ResponseEntity<ArrayNode> getDailyTopScores() {
		// List of JSON objects
		ArrayNode result = mapper.createArrayNode();

		// List of array of BigIntegers that contain userId and month score
		List<Object[]> orderedScores = new ArrayList<>();
		orderedScores = this.scoreRepo.findAllDailyScores();

		for (int i = 0; i < 10 && i < orderedScores.size(); i++) {
			// current userId and month score
			Object[] currScore = orderedScores.get(i);
			// One JSON object
			ObjectNode score = mapper.createObjectNode();
			// Convert BigInteger to long and int
			long userId = ((Number) currScore[0]).longValue();
			int dayScore = ((Number) currScore[1]).intValue();
			CustomUser user = this.userRepo.findById(userId);
			String username = user.getUsername();

			score.put("rank", i + 1);
			score.put("username", username);
			score.put("user", userId);
			score.put("score", dayScore);
			// add to result array of JSON objects
			result.add(score);
		}

		return ResponseEntity.ok().body(result);
	}

	// GET TOP 10 MONTHLY
	@GetMapping("/scores/month")
	public ResponseEntity<ArrayNode> getMonthlyTopScores() {
		// List of JSON objects
		ArrayNode result = mapper.createArrayNode();

		// List of array of BigIntegers that contain userId and month score
		List<Object[]> orderedScores = new ArrayList<>();
		orderedScores = this.scoreRepo.findAllMonthlyScores();

		for (int i = 0; i < 10 && i < orderedScores.size(); i++) {
			// current userId and month score
			Object[] currScore = orderedScores.get(i);
			// One JSON object
			ObjectNode score = mapper.createObjectNode();
			// Convert BigInteger to long and int
			long userId = ((Number) currScore[0]).longValue();
			int monthScore = ((Number) currScore[1]).intValue();
			CustomUser user = this.userRepo.findById(userId);
			String username = user.getUsername();

			score.put("rank", i + 1);
			score.put("username", username);
			score.put("user", userId);
			score.put("score", monthScore);
			// add to result array of JSON objects
			result.add(score);
		}

		return ResponseEntity.ok().body(result);
	}

	// GET TOP 10 YEARLY
	@GetMapping("/scores/year/{year}")
	public ResponseEntity<ArrayNode> getYearlyTopScores(@PathVariable int year) {
		// List of JSON objects
		ArrayNode result = mapper.createArrayNode();

		// List of array of BigIntegers that contain userId and month score
		List<Object[]> orderedScores = new ArrayList<>();
		orderedScores = this.scoreRepo.findAllYearlyScores(year);

		for (int i = 0; i < 10 && i < orderedScores.size(); i++) {
			// current userId and month score
			Object[] currScore = orderedScores.get(i);
			// One JSON object
			ObjectNode score = mapper.createObjectNode();
			// Convert BigInteger to long and int
			long userId = ((Number) currScore[0]).longValue();
			int monthScore = ((Number) currScore[1]).intValue();
			CustomUser user = this.userRepo.findById(userId);
			String username = user.getUsername();

			score.put("rank", i + 1);
			score.put("username", username);
			score.put("user", userId);
			score.put("score", monthScore);
			// add to result array of JSON objects
			result.add(score);
		}

		return ResponseEntity.ok().body(result);
	}

	// GET TOP 10 ALL TIME
	@GetMapping("/scores/alltime")
	public ResponseEntity<ArrayNode> getAllTimeTopScores() {
		ArrayNode result = mapper.createArrayNode();
		List<Object[]> allScores = this.scoreRepo.findAllScores();


		for (int i = 0; i < 10 && i < allScores.size(); i++) {
			// current userId and month score
			Object[] currScore = allScores.get(i);
			// One JSON object
			ObjectNode score = mapper.createObjectNode();
			// Convert BigInteger to long and int
			long userId = ((Number) currScore[0]).longValue();
			int monthScore = ((Number) currScore[1]).intValue();
			CustomUser user = this.userRepo.findById(userId);
			String username = user.getUsername();

			score.put("rank", i + 1);
			score.put("username", username);
			score.put("user", userId);
			score.put("score", monthScore);
			// add to result array of JSON objects
			result.add(score);
		}
		return ResponseEntity.ok().body(result);
	}
}
