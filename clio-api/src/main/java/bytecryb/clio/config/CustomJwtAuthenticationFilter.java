package bytecryb.clio.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import bytecryb.clio.model.CustomUser;
import bytecryb.clio.model.Role;
import bytecryb.clio.repository.UserRepository;
import bytecryb.clio.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;

@Component
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserRepository userRepo;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		try {

			// JWT Token is in the form "Bearer token". Remove Bearer word and
			// get only the Token
			String jwtToken = extractJwtFromRequest(request);

			if (StringUtils.hasText(jwtToken) && jwtTokenUtil.validateToken(jwtToken)) {
				List<SimpleGrantedAuthority> roles = null;
				String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				CustomUser user = userRepo.findByUsername(username);
				Role role = user.getRole();
				roles = Arrays.asList(new SimpleGrantedAuthority(role.getName()));
				UserDetails userDetails = new User(jwtTokenUtil.getUsernameFromToken(jwtToken), "", roles);

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}

		} catch (ExpiredJwtException ex) {
			request.setAttribute("exception", ex);
			throw ex;
		} catch (BadCredentialsException ex) {
			request.setAttribute("exception", ex);
			throw ex;
		}
		chain.doFilter(request, response);
	}

	private String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}