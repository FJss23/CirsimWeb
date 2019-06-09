package com.tfg.cirsim.api.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.security.utility.TokenUtil;

/**
 * 
 * @author francisco riedemann
 * @date 05/06/2019
 *
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
		
	private AuthenticationManager authenticationManager;
	private TokenUtil tokenUtil;
	
	public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
		tokenUtil = TokenUtil.getInstance();
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		
		try {
			
			User credentials = new ObjectMapper()
			        .readValue(request.getInputStream(), User.class);
			
			UsernamePasswordAuthenticationToken userToken = 
					new UsernamePasswordAuthenticationToken(credentials.getUsername(), 
							credentials.getPassword(),new ArrayList<>());
			
			//TODO: add log
			
			return authenticationManager.authenticate(userToken);

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain, Authentication authResult)
			throws IOException, ServletException {
		
		String token = tokenUtil.generateToken(authResult);
		
		if (token == null)
			return;
		
		//TODO: add log
		
		response = tokenUtil.completeHeaderWithToken(response, token);
	}
}
