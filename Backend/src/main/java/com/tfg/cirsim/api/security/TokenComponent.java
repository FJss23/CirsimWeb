package com.tfg.cirsim.api.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.tfg.cirsim.api.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 *
 */
@Component
public class TokenComponent {
	
	private final String SIGN_KEY = "cirsim265";
	private final long VALID_TIME_TOKEN = 600 * 1000;
	private final String AUTH_HEADER = "Authorization";
	private final String AUTH_COOKIE = "AUTH-TOKEN";
	private final String TOKEN_PREFIX = "Bearer ";
	
	/**
	 * Generates a JWT with username, creation time and expiration time
	 * sign with HS256
	 * @param auth with username and password
	 * @return String JWT serialize
	 */
	public String generateToken(Authentication auth) {
		return Jwts.builder()
				.setSubject(((User)auth.getPrincipal()).getUsername())
				.signWith(SignatureAlgorithm.HS256, SIGN_KEY)
				.setIssuedAt(calculateCurrentTime())
				.setExpiration(calculateExpirationTime())
				.compact();
	}
	
	/**
	 * Obtain the token from the client's request,
	 * search the header using the Bearer schema
	 * Authorization pattern: Bearer <token>
	 * @param request from the client
	 * @return String token found
	 */
	public String getToken(HttpServletRequest request) {
		String authHeader = request.getHeader(AUTH_HEADER);
		if(authHeader != null && authHeader.startsWith(TOKEN_PREFIX))
			return authHeader.substring(7);
		
		return null;
	}
	
	public String getUserNameFromToken(String token) {
		return getClaimsFromToken(token).getSubject();
	}
	
	/**
	 * Verify that the username is correct and that the token 
	 * has not expired
	 * @param token from request
	 * @param userDetails with the credentials of the user
	 * @return true if the token in valid, false otherwise
	 */
	public boolean validateToken(String token, UserDetails userDetails) {
		String username = getUserNameFromToken(token);
		return (username.equals(userDetails.getUsername())
				&& !expiredToken(token));
	}
	
	private boolean expiredToken(String token) {
		Date expiration = getClaimsFromToken(token).getExpiration();
		return expiration.before(new Date());
	}
	
	private Claims getClaimsFromToken(String token) {
		return Jwts.parser()
				.setSigningKey(SIGN_KEY)
				.parseClaimsJws(token)
				.getBody();
	}

	private Date calculateExpirationTime() {
		return new Date(System.currentTimeMillis() + VALID_TIME_TOKEN);
	}

	private Date calculateCurrentTime() {
		return new Date(System.currentTimeMillis());
	}

	public String getSignKey() {
		return SIGN_KEY;
	}

	public long getValidTimeToken() {
		return VALID_TIME_TOKEN;
	}

	public String getAuthHeader() {
		return AUTH_HEADER;
	}

	public String getAuthCookie() {
		return AUTH_COOKIE;
	}

	public String getTokenPrefix() {
		return TOKEN_PREFIX;
	}

}
