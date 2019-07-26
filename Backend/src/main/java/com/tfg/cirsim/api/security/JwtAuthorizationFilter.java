package com.tfg.cirsim.api.security;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.tfg.cirsim.api.security.utility.TokenUtil;

/**
 * 
 * @author francisco.riedemann
 * 
 * Special case, UserDetailsService with the tag @Autowired can not be injected
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	
	private UserDetailsServiceImpl userDetailsService;
	private TokenUtil tokenUtil;
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx) {
		super(authenticationManager);
	    this.userDetailsService = ctx.getBean(UserDetailsServiceImpl.class);
		tokenUtil = TokenUtil.getInstance();
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, 
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if(!tokenUtil.isValidHeaderTokenAuth(request)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		if(tokenUtil.isTokenExpired(request)) {
			filterChain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken auth = getAuthentication(request);
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		filterChain.doFilter(request, response);
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
		
		String token = tokenUtil.getToken(request);
		if(token == null)
			return null;
		
		String username = tokenUtil.getUserNameFromToken(token);
		if(username == null)
			return null;
		
		UserDetails user = userDetailsService.loadUserByUsername(username);
		Collection<SimpleGrantedAuthority> authorities = tokenUtil.getAuthorities(token);
		
		return  new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), authorities);
	}

}
