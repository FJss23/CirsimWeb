package com.tfg.cirsim.api.security.utility;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
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
		String username = ((org.springframework.security.core.userdetails.User)auth.getPrincipal())
				.getUsername();
		
		String authorities = auth.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));
		
		return Jwts.builder()
				.setSubject(username)
				.claim(SecurityConstants.AUTHORITIES_KEY, authorities)
				.signWith(SignatureAlgorithm.HS256, SecurityConstants.SECRET)
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
		Claims claims = getClaimsFromToken(token);
		return (claims == null) ? null : claims.getSubject();
	}
	
	private static Claims getClaimsFromToken(String token) {
		try {
			return Jwts.parser()
					.setSigningKey(SecurityConstants.SECRET)
					.parseClaimsJws(token)
					.getBody();
		} catch (JwtException | IllegalArgumentException e) {
			return null;
		}
	}
	
	public static Collection<SimpleGrantedAuthority> getAuthorities(String token){
		Claims claims = getClaimsFromToken(token);
		
		return Arrays.stream(claims.get(SecurityConstants.AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}

	private static Date calculateExpirationTime() {
		return new Date(System.currentTimeMillis() + SecurityConstants.VALID_TIME_TOKEN);
	}

	private static Date calculateCurrentTime() {
		return new Date(System.currentTimeMillis());
	}

	public static boolean isTokenExpired(HttpServletRequest request) {
		Claims claims = getClaimsFromToken(getToken(request));
		if(claims == null)
			return false;
		return (claims.getExpiration().before(new Date())) ? true : false;
	}

}
