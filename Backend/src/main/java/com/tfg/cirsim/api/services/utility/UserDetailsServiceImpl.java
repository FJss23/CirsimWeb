package com.tfg.cirsim.api.services.utility;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
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
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null)
			throw new UsernameNotFoundException(username);
		
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(), user.getPassword(), new ArrayList<>());
	}

}
