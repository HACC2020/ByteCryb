package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.CustomUser;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.model.Role;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Value("${welcome.message}")
	private String welcomeMessage;

    @Autowired
    private UserRepository userRepo;

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
}