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
import com.tfg.cirsim.api.entities.Status;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;
import com.tfg.cirsim.api.security.utility.TokenUtil;

/**
 * 
 * @author francisco riedemann
 *
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
		
	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private TokenUtil tokenUtil;
	
	public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
			UserRepository userRepository) {
		
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		
		tokenUtil = TokenUtil.getInstance();
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		
		try {
			
			User credentials = new ObjectMapper()
			        .readValue(request.getInputStream(), User.class);
			String username = credentials.getUsername();
			String password = credentials.getPassword();
			
			User completeUser = userRepository.findByUsername(credentials
					.getUsername());
			if(completeUser != null) {
				if(completeUser.getStatus() == Status.INACTIVE) {
					username = null;
					password = null;
				}
			}
			
			UsernamePasswordAuthenticationToken userToken = 
					new UsernamePasswordAuthenticationToken(username, password,
							new ArrayList<>());
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
		
		response = tokenUtil.completeHeaderWithToken(response, token);
	}
}
