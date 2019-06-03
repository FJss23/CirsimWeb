package com.tfg.cirsim.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.services.UserService;


/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/api/cirsim", produces = { "application/json" })
public class UserController {
	
	@Autowired
	UserService userService;

	@GetMapping(value = "/user")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@PostMapping(value = "/user")
	public User postUser(@RequestBody User user) {
		return userService.addUser(user);	
	}
	
	@GetMapping(value= "/user/{id}")
	public User getUser(@PathVariable Long id) {
		return userService.getUser(id);
	}
	
	@PutMapping(value = "/user/{id}")
	public User putUser(@PathVariable Long id, @RequestBody User user) {
		return userService.updateUser(id, user);
	}
	
	@DeleteMapping(value = "/user/{id}")
	public User deleteUser(@PathVariable Long id) {
		return userService.deleteUser(id);
	}
}
