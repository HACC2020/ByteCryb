package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.Role;
import bytecryb.clio.model.Score;
// import bytecryb.clio.repository.AwardRepository;
import bytecryb.clio.repository.ScoreRepository;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.util.JwtUtil;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Value("${welcome.message}")
	private String welcomeMessage;

	// @Autowired
	// private AwardRepository awardRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ScoreRepository scoreRepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private ObjectMapper mapper;

	// Get username from token
	public String getUser(HttpServletRequest request) {
		String jwtToken = extractJwtFromRequest(request);
		String username = jwtUtil.getUsernameFromToken(jwtToken);
		return username;
	}

	@GetMapping("/users")
	public ResponseEntity<List<ResultUser>> getUsers() {
		List<CustomUser> query = this.userRepo.findAll();

		List<ResultUser> result = new ArrayList<ResultUser>();

		Iterator<CustomUser> userIterator = query.iterator();

		while (userIterator.hasNext()) {
			CustomUser tmp = userIterator.next();
			Role currRole = tmp.getRole();
			String roleName = currRole.getName();
			result.add(new ResultUser(tmp.getUserId(), tmp.getUsername(), tmp.getFirstName(), tmp.getLastName(),
					tmp.getEmail(), roleName));
		}

		return ResponseEntity.ok().body(result);
	}

	// GET BASIC PROFILE INFO OF USER (username, role, score, badges)
	@GetMapping("/users/profile")
	public ResponseEntity<ObjectNode> userInfo(HttpServletRequest request) {
		// json return object, utilize objectnode and objectmapper
		ObjectNode result = mapper.createObjectNode();

		// get username
		String jwtToken = extractJwtFromRequest(request);
		String currUsername = jwtUtil.getUsernameFromToken(jwtToken);
		result.put("username", currUsername);

		System.out.println(jwtToken);
		System.out.println(result);

		// create CustomUser object to find role, scores, and badges
		CustomUser currUser = this.userRepo.findByUsername(currUsername);

		result.put("user", currUser.toString());

		// get role
		String currRoleName = currUser.getRole().getName();
		result.put("role", currRoleName);

		// get total score
		Long userId = currUser.getUserId();
		List<Score> score = this.scoreRepo.findByUserId(userId);
		result.put("score", score.get(0).getScore());

		// get badges
		// List<Award> awards = this.awardRepo.findByUserId(userId);
		// List<String> badgeNames = new ArrayList<>();
		// if (awards.size() > 0) {
		// for (Award award : awards) {
		// String currBadgeName = award.getBadge().getName();
		// badgeNames.add(currBadgeName);
		// }
		// }
		// result.putPOJO("badges", badgeNames);

		System.out.println(result);

		return ResponseEntity.ok().body(result);
	}

	// GET BASIC PROFILE INFO OF USER (username, role, score, badges)
	@GetMapping("/users/profile/v2")
	public ResponseEntity<Map<String, Object>> userInfoV2(HttpServletRequest request) {
		// get username
		String jwtToken = extractJwtFromRequest(request);
		String currUsername = jwtUtil.getUsernameFromToken(jwtToken);

		// create CustomUser object to find role, scores, and badges
		CustomUser currUser = this.userRepo.findByUsername(currUsername);

		Map<String, Object> result = new LinkedHashMap<>();

		result.put("userId", currUser.getUserId());
		result.put("username", currUser.getUsername());
		result.put("firstName", currUser.getFirstName());
		result.put("lastName", currUser.getLastName());
		result.put("email", currUser.getEmail());
		result.put("role", currUser.getRole());

		return ResponseEntity.ok().body(result);
	}

	// gets jwt from http servlet request (not a endpoint)
	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}