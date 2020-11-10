package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.StringUtils;

import bytecryb.clio.model.Award;
import bytecryb.clio.model.Badge;
import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.Role;
import bytecryb.clio.model.Score;

import bytecryb.clio.repository.AwardRepository;
import bytecryb.clio.repository.ScoreRepository;
import bytecryb.clio.repository.UserRepository;

import bytecryb.clio.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Value("${welcome.message}")
	private String welcomeMessage;

	@Autowired
	private AwardRepository awardRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ScoreRepository scoreRepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private ObjectMapper mapper;
	
	//Get username from token
	public String getUser(HttpServletRequest request) {
		String jwtToken = extractJwtFromRequest(request);
		String username = jwtUtil.getUsernameFromToken(jwtToken);
		return username;
	}

    @GetMapping("/all")
    public ResponseEntity<List<ResultUser>> getUsers() {
		List<CustomUser> query = this.userRepo.findAll();

		List<ResultUser> result = new ArrayList<ResultUser>();

		Iterator<CustomUser> userIterator = query.iterator();

		while (userIterator.hasNext()) {
			CustomUser tmp = userIterator.next();
			Role currRole = tmp.getRole();
			String roleName = currRole.getName();
			result.add(new ResultUser(tmp.getUserId(), tmp.getUsername(), tmp.getFirstName(), tmp.getLastName(), tmp.getEmail(), roleName));
		}

		return ResponseEntity.ok().body(result);
	}

	// GET BASIC PROFILE INFO OF USER (username, role, score, badges)
	@GetMapping("/userInfo")
	public ResponseEntity<ArrayNode> userInfo(HttpServletRequest request) {
		//json return object, utilize objectnode and objectmapper
		ArrayNode result = mapper.createArrayNode();
		ObjectNode data = mapper.createObjectNode();

		//get username
		String jwtToken = extractJwtFromRequest(request);
		String currUsername = jwtUtil.getUsernameFromToken(jwtToken);
		data.put("username", currUsername);

		//create CustomUser object to find role, scores, and badges
		CustomUser currUser = this.userRepo.findByUsername(currUsername);

		//get role
		String currRoleName = currUser.getRole().getName();
		data.put("role", currRoleName);

		//get total score
		Long userId = currUser.getUserId();
		Score score = this.scoreRepo.findByUserId(userId);
		data.put("score", score.getScore());
		
		//get badges
		/*List<Award> awards = this.awardRepo.findByUserId(userId);
		List<String> badgeNames = new ArrayList<>();
		if (awards.size() > 0) {
			for (Award award : awards) {
				String currBadgeName = award.getBadge().getName();
				badgeNames.add(currBadgeName);
			}

			for (String name : badgeNames) {
				returnList.add(name);
			}

		}*/
		result.addAll(Arrays.asList(data));

		return ResponseEntity.ok().body(result);
	}


    @GetMapping("/restricted")
    public String restricted() {
    	return welcomeMessage;
	}
	
	@GetMapping("/rookie")
	public String rookie() {
		return "Welcome rookie";
	}

	@GetMapping("/indexer")
	public String indexer() {
		return "Welcome indexer";
	}

	@GetMapping("/proofer")
	public String proofer() {
		return "Welcome proofer";
	}

	@GetMapping("/archivist")
	public String archivist() {
		return "Welcome archivist";
	}

	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}