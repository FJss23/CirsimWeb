package com.tfg.cirsim.api.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 * 
 */
public class JwtAuthFilter extends OncePerRequestFilter{
	
	@Autowired
    private UserDetailsService userDetailsService;
	
	@Autowired
	private TokenService tokenService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
	}

}
