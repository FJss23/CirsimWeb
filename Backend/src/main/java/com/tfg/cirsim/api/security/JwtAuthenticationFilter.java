package com.tfg.cirsim.api.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.cirsim.api.entities.User;

/**
 * 
 * @author francisco riedemann
 * @date 05/06/2019
 *
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	@Autowired
	private TokenComponent tokenComponent;
	
	private AuthenticationManager authenticationManager;
	
	public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		
		try {
			
			User credentials = new ObjectMapper()
			        .readValue(request.getInputStream(), User.class);
			
			UsernamePasswordAuthenticationToken userTk = 
					new UsernamePasswordAuthenticationToken(credentials.getUsername(), 
							credentials.getPassword());
			
			return authenticationManager.authenticate(userTk);

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain, Authentication authResult)
			throws IOException, ServletException {
		
		String token = tokenComponent.generateToken(authResult);
		
		response.addHeader(tokenComponent.getAuthHeader(), 
				tokenComponent.getTokenPrefix() + token);
	}
}
