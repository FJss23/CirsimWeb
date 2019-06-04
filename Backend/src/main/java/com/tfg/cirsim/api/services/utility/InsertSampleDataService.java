package com.tfg.cirsim.api.services.utility;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.services.UserService;

/**
 * 
 * @author francisco riedemann
 * @date 03/06/2019
 *
 */
@Service
public class InsertSampleDataService {
	
	@Autowired
	private UserService userService;
	
	@PostConstruct
	public void init() {
		User user1 = new User("user1", "123", "nombre1", "apellido1", Role.ROLE_ADMIN);
		User user2 = new User("user2", "123", "nombre2", "apellido2", Role.ROLE_TEACHER);
		User user3 = new User("user3", "123", "nombre3", "apellido3", Role.ROLE_STUDENT);
		User user4 = new User("user4", "123", "nombre4", "apellido4", Role.ROLE_STUDENT);
		User user5 = new User("user5", "123", "nombre5", "apellido5", Role.ROLE_STUDENT);
		User user6 = new User("user6", "123", "nombre6", "apellido6", Role.ROLE_STUDENT);
		
		userService.addUser(user1);
		userService.addUser(user2);
		userService.addUser(user3);
		userService.addUser(user4);
		userService.addUser(user5);
		userService.addUser(user6);
	}
	
}
