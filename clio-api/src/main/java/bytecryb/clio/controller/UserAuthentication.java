package bytecryb.clio.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;

import bytecryb.clio.model.ResultUser;

@RestController
@RequestMapping("/auth")
public class UserAuthentication {

    @PostMapping(path = "/login", consumes = "application/json")
    public String loginUser(@RequestBody ResultUser user) {
        return user.getFirstName();
    }

    @PostMapping(path = "/logout", consumes = "application/json")
    public String logoutUser(@RequestBody ResultUser user) {
        return user.getLastName();
    }

    @PostMapping(path = "/signup", consumes = "application/json")
    public String signupUser(@RequestBody ResultUser user) {
        return user.getFirstName();
    }
}