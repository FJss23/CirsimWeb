package com.tfg.cirsim.api.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 * 
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	
	@Autowired
	private TokenComponent tokenComponent;
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, 
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String auth1 = tokenComponent.getAuthHeader();
		System.out.println(auth1);
		
		String header = request.getHeader(auth1);
		
		if(header == null || !header.startsWith(tokenComponent.getTokenPrefix())) {
			filterChain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken auth = getAuthentication(request);
		SecurityContextHolder.getContext().setAuthentication(auth);
	}

	/**
	 * Obtain the UsernamePasswordAuthenticationToken
	 * from the token, adding the username from the user otherwise
	 * return null
	 * @param request from the client
	 * @return UsernamePasswordAuthenticationToken if exist a token 
	 * otherwise null
	 */
	private UsernamePasswordAuthenticationToken getAuthentication(
			HttpServletRequest request) {
		
		String token = tokenComponent.getToken(request);
		
		if(token == null)
			return null;
		
		String username = tokenComponent.getUserNameFromToken(token);
		
		return (username == null) ? 
				null: new UsernamePasswordAuthenticationToken(username, null);
	}

}
