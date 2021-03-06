package com.tfg.cirsim.api.services.utility;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;

/**
 * 
 * @author francisco riedemann
 *
 */
@Service
public class InsertSampleDataService {
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	UserRepository userRepository;
	
	@PostConstruct
	public void init() {
		User user1 = new User("admin", "123", "admin1", "admin1", Role.ADMIN);
		user1.setPassword(bCryptPasswordEncoder.encode(user1.getPassword()));
		User user3 = new User("profesor", "123", "profesor1", "profesor1", Role.TEACHER);
		user3.setPassword(bCryptPasswordEncoder.encode(user3.getPassword()));
		User user2 = new User("alumno1", "123", "alumno1", "alumno1", Role.STUDENT);
		user2.setPassword(bCryptPasswordEncoder.encode(user2.getPassword()));
		User user4 = new User("alumno2", "123", "alumno2", "alumno2", Role.STUDENT);
		user4.setPassword(bCryptPasswordEncoder.encode(user4.getPassword()));
		User user5 = new User("alumno3", "123", "alumno3", "alumno3", Role.STUDENT);
		user5.setPassword(bCryptPasswordEncoder.encode(user5.getPassword()));
		User user6 = new User("alumno4", "123", "alumno4", "alumno4", Role.STUDENT);
		user6.setPassword(bCryptPasswordEncoder.encode(user6.getPassword()));
		
		userRepository.save(user1);
		userRepository.save(user2);
		userRepository.save(user3);
		userRepository.save(user4);
		userRepository.save(user5);
		userRepository.save(user6);
	}
	
}
