package com.tfg.cirsim.api.security.utility;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
 *
 */

public class TokenUtil {	
	
	private static TokenUtil instance = new TokenUtil();
	 
	private TokenUtil() { }
	 
	public static TokenUtil getInstance( ) {
		if (instance == null) {
	        instance = new TokenUtil();
	    }
	    return instance;
    }
	
	/**
	 * Generates a JWT with username, creation time and expiration time, 
	 * authorities, name and surname
	 * sign with HS256
	 * @param auth with username and password
	 * @return String JWT serialize
	 */
	public String generateToken(Authentication auth) {
		
		String username = ((org.springframework.security.core.userdetails.User)auth.getPrincipal())
				.getUsername();
		
		String authorities = auth.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));
		
		try {
			return Jwts.builder()
					.setSubject(username)
					.claim(GlobalProperties.AUTHORITIES_KEY, authorities)
					.signWith(SignatureAlgorithm.HS256, GlobalProperties.SECRET)
					.setIssuedAt(calculateCurrentTime())
					.setExpiration(calculateExpirationTime())
					.compact();
		} catch(JwtException | IllegalArgumentException e) {
			System.err.println("Ha ocurrido un error al generar el token");
		}
		return null;
	}
	
	/**
	 * Obtain the token from the client's request,
	 * search the header using the Bearer schema
	 * Authorization pattern: Bearer <token>
	 * @param request from the client
	 * @return String token found
	 */
	public String getToken(HttpServletRequest request) {
		String authHeader = request.getHeader(GlobalProperties.AUTH_HEADER);
		if(authHeader != null && authHeader.startsWith(GlobalProperties.TOKEN_PREFIX))
			return authHeader.substring(7);
		
		return null;
	}
	
	/**
	 * Obain the claims for the token received
	 * @param token received
	 * @return Claims for the token
	 */
	private Claims getClaimsFromToken(String token) {
		try {
			return Jwts.parser()
					.setSigningKey(GlobalProperties.SECRET)
					.parseClaimsJws(token)
					.getBody();
		} catch (JwtException | IllegalArgumentException e) {
			//TODO: add log
		}
		return null;
	}
	
	/**
	 * Get the collection of authorities that the token has for the user
	 * @param token String
	 * @return a collection of authorities contained in the token
	 */
	public Collection<SimpleGrantedAuthority> getAuthorities(String token){
		Claims claims = getClaimsFromToken(token);
		
		return Arrays.stream(claims.get(GlobalProperties.AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}
	
	/**
	 * Verify that the request header has a correct Authentication parameter
	 * @param request send
	 * @return true if it is valid, otherwise false
	 */
	public boolean isValidHeaderTokenAuth(HttpServletRequest request) {
		String header = request.getHeader(GlobalProperties.AUTH_HEADER);
		
		if(header == null || !header.startsWith(GlobalProperties.TOKEN_PREFIX))
			return false;
		return true;
	}

	/**
	 * Add to the header of the request the corresponding parameter with the token
	 * @param response HttpServletResponse
	 * @param token String
	 * @return the response with the full autentication parameter
	 */
	public HttpServletResponse completeHeaderWithToken(HttpServletResponse response,
			String token) {
		
		response.addHeader(GlobalProperties.AUTH_HEADER, 
				GlobalProperties.TOKEN_PREFIX + token);
		
		return response;
	}
	
	private Date calculateExpirationTime() {
		return new Date(System.currentTimeMillis() + GlobalProperties.VALID_TIME_TOKEN);
	}

	private Date calculateCurrentTime() {
		return new Date(System.currentTimeMillis());
	}

	public boolean isTokenExpired(HttpServletRequest request) {
		Claims claims = getClaimsFromToken(getToken(request));
		if(claims == null)
			return false;
		return (claims.getExpiration().before(new Date())) ? true : false;
	}
	
	public String getUserNameFromToken(String token) {
		Claims claims = getClaimsFromToken(token);
		return (claims == null) ? null : claims.getSubject();
	}

}
