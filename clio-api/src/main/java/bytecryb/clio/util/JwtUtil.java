package bytecryb.clio.util;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class JwtUtil {

	private String secret;
	private int jwtExpirationInMs;

	@Value("${jwt.secret}")
	public void setSecret(String secret) {
		this.secret = secret;
	}

	@Value("${jwt.expirationDateInMs}")
	public void setJwtExpirationInMs(int jwtExpirationInMs) {
		this.jwtExpirationInMs = jwtExpirationInMs;
	}

	// generate token for user
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
		if (roles.contains(new SimpleGrantedAuthority("rookie"))) {
			claims.put("isRookie", true);
		}
		if (roles.contains(new SimpleGrantedAuthority("indexer"))) {
			claims.put("isIndexer", true);
		}
		if (roles.contains(new SimpleGrantedAuthority("proofer"))) {
			claims.put("isProofer", true);
		}
		if (roles.contains(new SimpleGrantedAuthority("archivist"))) {
			claims.put("isArchivist", true);
		}
		return doGenerateToken(claims, userDetails.getUsername());
	}

	private String doGenerateToken(Map<String, Object> claims, String subject) {

		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public boolean validateToken(String authToken) throws BadCredentialsException {
		try {
			// Jwt token has not been tampered with
			Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
		} catch (ExpiredJwtException ex) {
			throw new BadCredentialsException("EXPIRED_TOKEN", ex);
		}
	}

	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

		return claims.getSubject();
	}

	public List<SimpleGrantedAuthority> getRolesFromToken(String authToken) {
		List<SimpleGrantedAuthority> roles = null;
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken).getBody();
		Boolean isRookie = claims.get("isRookie", Boolean.class);
		Boolean isIndexer = claims.get("isIndexer", Boolean.class);
		Boolean isProofer = claims.get("isProofer", Boolean.class);
		Boolean isArchivist = claims.get("isArchivist", Boolean.class);
		if (isRookie != null && isRookie == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("rookie"));
		}
		if (isIndexer != null && isIndexer == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("veteran"));
		}
		if (isProofer != null && isProofer == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("proofer"));
		}
		if (isArchivist != null && isArchivist == true) {
			roles = Arrays.asList(new SimpleGrantedAuthority("archivist"));
		}
		return roles;
	}

	// gets jwt from http servlet request (not a endpoint)
	public String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}