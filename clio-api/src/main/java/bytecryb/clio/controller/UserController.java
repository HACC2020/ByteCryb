package bytecryb.clio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/all")
    public String getAllUsers() {
        return "Hello! This basic endpoint works!";
    }

    @GetMapping("/restricted")
    public String restricted() {
        return "You must be logged in to view this.";
    }
}