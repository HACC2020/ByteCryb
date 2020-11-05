package bytecryb.clio.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.Score;
import bytecryb.clio.model.User;
import bytecryb.clio.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/all")
    public ResponseEntity<List<ResultUser>> getUsers() {
		List<User> query = this.userRepo.findAll();

		List<ResultUser> result = new ArrayList<ResultUser>();

		Iterator<User> userIterator = query.iterator();

		while (userIterator.hasNext()) {
			User tmp = userIterator.next();
			result.add(new ResultUser(tmp.getUserId(), tmp.getUsername(), tmp.getFirstName(), tmp.getLastName(), tmp.getEmail(), tmp.getRoleId()));
		}

		return ResponseEntity.ok().body(result);
	}

    @GetMapping("/restricted")
    public String restricted() {
        return "You must be logged in to view this.";
    }
}