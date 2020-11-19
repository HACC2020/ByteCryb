package bytecryb.clio.controller;

import java.util.LinkedHashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.exception.SignupTakenException;
import bytecryb.clio.model.AuthenticationRequest;
import bytecryb.clio.model.AuthenticationResponse;
import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.ResultUser;
import bytecryb.clio.model.Role;
import bytecryb.clio.repository.RoleRepository;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.service.CustomUserDetailsService;
import bytecryb.clio.util.JwtUtil;


@RestController
@RequestMapping("/auth")
public class UserAuthentication {
    @Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;
    
	// {username, password}
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(token));
	}
	
	// {username, email, password}
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody CustomUser user) throws SignupTakenException {

        if(userRepo.existsByUsername(user.getUsername())) {
            throw new SignupTakenException("Username taken.");
        }
        if(userRepo.existsByEmail(user.getEmail())) {
        	throw new SignupTakenException("Email is already in use.");
		}

		Role role = roleRepo.findByRoleName("rookie");
		user.setRole(role);
		CustomUser savedUser = userDetailsService.save(user);

		ResultUser resUser = new ResultUser(savedUser.getUserId(), savedUser.getUsername(), savedUser.getEmail(), "rookie");
		final UserDetails userDetails = userDetailsService.loadUserByUsername(resUser.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);
		resUser.setAuthToken(token);
		return ResponseEntity.ok(resUser);
	}

	@RequestMapping(value="/login/google")
	public ResponseEntity<?> googleLogin(OAuth2Authentication authentication) throws Exception {
		@SuppressWarnings("unchecked")
		LinkedHashMap<String, Object> properties = (LinkedHashMap<String, Object>) authentication.getUserAuthentication().getDetails();
		try {
			CustomUser user = userRepo.findByEmail(properties.get("email").toString());
			final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
			final String token = jwtTokenUtil.generateToken(userDetails);
			return ResponseEntity.ok(new AuthenticationResponse(token));
		} catch (Exception e) {
			throw new Exception("Email associated with google account not found in database. Please signup.", e);
		}

	 }

	 @RequestMapping(value="/signup/google")
	 public ResponseEntity<?> googleSignup(OAuth2Authentication authentication) {
		@SuppressWarnings("unchecked")
		LinkedHashMap<String, Object> properties = (LinkedHashMap<String, Object>) authentication.getUserAuthentication().getDetails();
		CustomUser user = new CustomUser();
		UUID uuid = UUID.randomUUID();
		user.setUsername(uuid.toString());
		user.setEmail(properties.get("email").toString());
		user.setFirstName(properties.get("given_name").toString());
		user.setLastName(properties.get("family_name").toString());
		Role role = roleRepo.findByRoleName("rookie");
		user.setRole(role);
		CustomUser savedUser = userRepo.save(user);
		ResultUser resUser = new ResultUser(savedUser.getUserId(), savedUser.getUsername(), savedUser.getEmail(), "rookie");
		UserDetails userDetails = userDetailsService.loadUserByUsername(resUser.getUsername());
		String token = jwtTokenUtil.generateToken(userDetails);
		resUser.setAuthToken(token);
		return ResponseEntity.ok(resUser);
	 }
}