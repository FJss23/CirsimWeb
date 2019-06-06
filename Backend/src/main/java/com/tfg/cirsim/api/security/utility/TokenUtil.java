package com.tfg.cirsim.api.security.utility;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import com.tfg.cirsim.api.security.SecurityConstants;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 *
 */

public class TokenUtil {
	
	
	/**
	 * Generates a JWT with username, creation time and expiration time
	 * sign with HS256
	 * @param auth with username and password
	 * @return String JWT serialize
	 */
	public static String generateToken(Authentication auth) {
		return Jwts.builder()
				.setSubject(((org.springframework.security.core.userdetails.User)auth.getPrincipal())
						.getUsername())
				.signWith(SignatureAlgorithm.HS256, SecurityConstants.SIGN_KEY)
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
	public static String getToken(HttpServletRequest request) {
		String authHeader = request.getHeader(SecurityConstants.AUTH_HEADER);
		if(authHeader != null && authHeader.startsWith(SecurityConstants.TOKEN_PREFIX))
			return authHeader.substring(7);
		
		return null;
	}
	
	public static String getUserNameFromToken(String token) {
		return getClaimsFromToken(token).getSubject();
	}
	
	/**
	 * Verify that the username is correct and that the token 
	 * has not expired
	 * @param token from request
	 * @param userDetails with the credentials of the user
	 * @return true if the token in valid, false otherwise
	 */
	public static boolean validateToken(String token, UserDetails userDetails) {
		String username = getUserNameFromToken(token);
		return (username.equals(userDetails.getUsername())
				&& !expiredToken(token));
	}
	
	private static boolean expiredToken(String token) {
		Date expiration = getClaimsFromToken(token).getExpiration();
		return expiration.before(new Date());
	}
	
	private static Claims getClaimsFromToken(String token) {
		return Jwts.parser()
				.setSigningKey(SecurityConstants.SIGN_KEY)
				.parseClaimsJws(token)
				.getBody();
	}

	private static Date calculateExpirationTime() {
		return new Date(System.currentTimeMillis() + SecurityConstants.VALID_TIME_TOKEN);
	}

	private static Date calculateCurrentTime() {
		return new Date(System.currentTimeMillis());
	}

}