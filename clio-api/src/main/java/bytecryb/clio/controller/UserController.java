package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.Role;
import bytecryb.clio.model.Score;
import bytecryb.clio.repository.RoleRepository;
import bytecryb.clio.repository.ScoreRepository;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.service.CustomUserDetailsService;
import bytecryb.clio.util.JwtUtil;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	@Value("${welcome.message}")
	private String welcomeMessage;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private ScoreRepository scoreRepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;


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
  
	// UPDATES GIVEN USER'S ROLE
	@PutMapping("/users/updateRole/{role_name}")
  @Transactional
  public ResponseEntity<CustomUser> updateRole(@PathVariable(name = "role_name") String roleName, HttpServletRequest request) {
		//Take out special characters and whitespaces
		roleName = roleName.replaceAll("\\s", "");

		//if given role name does not exist, throw an exception
		if (!this.roleRepo.existsByRoleName(roleName)) {
			throw new IllegalArgumentException("Role: " + roleName + " does not exist");
		}

		// get username
		String jwtToken = extractJwtFromRequest(request);
		String currUsername = jwtUtil.getUsernameFromToken(jwtToken);
		
		
		CustomUser user  = this.userRepo.findByUsername(currUsername);
		Role role = this.roleRepo.findByRoleName(roleName);
		user.setRole(role);
		final CustomUser update = this.userRepo.save(user);

        return ResponseEntity.ok().body(update);

	}
	
	// UPDATES CURRENT USER'S FIRST & LAST NAME AND USERNAME
	@PutMapping("/users/updateNames")
	public ResponseEntity<Map<String, Object>> updateNames(HttpServletRequest request, @RequestBody String jsonStr) {
		// get username
		String jwtToken = extractJwtFromRequest(request);
		String currUsername = jwtUtil.getUsernameFromToken(jwtToken);

		// create CustomUser object to find role, scores, and badges
		CustomUser currUser = this.userRepo.findByUsername(currUsername);

		// put json string into json object
		JSONObject input = new JSONObject(jsonStr);

		// retrieve separate inputs from json object
		String firstName = input.getString("first_name").replaceAll("\\s", "");
		String lastName = input.getString("last_name").replaceAll("\\s", "");
		String username = input.getString("username").replaceAll("\\s", "");

		Map<String, Object> res = new HashMap<>();
		// only update parameters that are not empty or different
		if (firstName.length() > 0 && !firstName.equals(currUser.getFirstName())) {
			currUser.setFirstName(firstName);
		}

		if (lastName.length() > 0  && !lastName.equals(currUser.getLastName())) {
			currUser.setLastName(lastName);
		}

		if (username.length() > 0 && !username.equals(currUser.getUsername())) {
			currUser.setUsername(username);
			this.userRepo.save(currUser);
			ResultUser resUser = new ResultUser(currUser.getUserId(), currUser.getUsername(), currUser.getFirstName(), 
			currUser.getLastName(), currUser.getEmail(), currUser.getRole().getName());
			final UserDetails userDetails = userDetailsService.loadUserByUsername(resUser.getUsername());
			final String token = jwtTokenUtil.generateToken(userDetails);
			resUser.setAuthToken(token);
			res.put("token", token);
		} else {
			res.put("token", jwtToken);
			this.userRepo.save(currUser);
		}

		res.put("user_id", currUser.getUserId());
		res.put("username", currUser.getUsername());
		res.put("first_name", currUser.getFirstName());
		res.put("last_name", currUser.getLastName());

		return ResponseEntity.ok().body(res);
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