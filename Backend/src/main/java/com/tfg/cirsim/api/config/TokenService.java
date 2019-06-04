package com.tfg.cirsim.api.config;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.server.Session.Cookie;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 *
 */
@Service
public class TokenService {
	
	private final String SIGN_KEY = "cirsim265";
	private final long VALID_TIME_TOKEN = 600 * 1000;
	private final String AUTH_HEADER = "Authorization";
	private final String AUTH_COOKIE = "AUTH-TOKEN";
	
	/**
	 * Generates a JWT with username, creation time and expiration time
	 * @param auth with username and password
	 * @return String JWT serialize
	 */
	public String generateToken(Authentication auth) {
		return Jwts.builder()
				.setSubject(auth.getName())
				.signWith(SignatureAlgorithm.HS256, SIGN_KEY)
				.setIssuedAt(obtainCurrentTime())
				.setExpiration(obtainExpirationTime())
				.compact();
	}
	
	public String getToken(HttpServletRequest request) {
		Cookie authCookie = getValueFromCooke(request, AUTH_COOKIE);
		//TODO: complete bussines logic
		return null;
	}

	/**
	 * Multiple cookies can be managed
	 * This function obtain the correct one with the token
	 * @param request from the client
	 * @param authCookie which we are looking for
	 * @return Correct cookie with token
	 */
	private Cookie getValueFromCooke(HttpServletRequest request, String authCookie) {
		//TODO: complete bussines logic
		return null;
	}
	
	private Date obtainExpirationTime() {
		return new Date(System.currentTimeMillis() + VALID_TIME_TOKEN);
	}

	private Date obtainCurrentTime() {
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
}
