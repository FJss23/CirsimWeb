package com.tfg.cirsim.api.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;

/**
 * 
 * @author francisco riedemann
 * @date 06/06/2019
 *
 */
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null)
			throw new UsernameNotFoundException(username);
		
		return buildSpringUser(user);
	}

	private UserDetails buildSpringUser(User user) {
		return new org.springframework.security.core.userdetails
				.User(user.getUsername(), user.getPassword(), getAuthorities(user));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(User user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();
		authorities.add(new SimpleGrantedAuthority(user.getRole().getText()));
		return authorities;
	}

}
