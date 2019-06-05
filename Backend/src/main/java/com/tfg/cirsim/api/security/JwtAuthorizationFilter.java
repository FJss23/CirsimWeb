package com.tfg.cirsim.api.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 * 
 */
public class JwtAuthorizationFilter extends OncePerRequestFilter{
	
	@Autowired
    private UserDetailsService userDetailsService;
	
	@Autowired
	private TokenComponent tokenService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, 
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = tokenService.getToken(request);
		String username = tokenService.getUserNameFromToken(token);
		
		if(username != null && SecurityContextHolder.getContext().getAuthentication()  == null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			
			if(tokenService.validateToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, "");
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
		
		filterChain.doFilter(request, response);
	}

}
