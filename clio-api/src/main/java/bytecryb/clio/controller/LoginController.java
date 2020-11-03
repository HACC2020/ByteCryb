package bytecryb.clio.controller;

import java.security.Principal;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableOAuth2Sso
@RestController
@RequestMapping("/auth")
public class LoginController {

	@GetMapping("/login")
	public String message(Principal principal) {
        return "Hi " + principal.getName() + " welcome!";
    }
}