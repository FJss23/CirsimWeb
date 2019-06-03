package com.tfg.cirsim.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.cirsim.api.model.User;
import com.tfg.cirsim.api.service.UserService;


/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/cirsim/api", produces = { "application/json" })
public class UserController {
	
	@Autowired
	UserService userService;

	@GetMapping(value = "/user")
	public List<User> finAllUser() {
		return userService.getUsers();
	}
	
	@PostMapping(value = "/user")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);	
	}
	
	@GetMapping(value= "/user/{id}")
	public User getOneUser(@PathVariable Long id) {
		return userService.getUser(id);
	}
	
	@PutMapping(value = "/user/{id}")
	public User replaceUser(@PathVariable Long id, @RequestBody User user) {
		return userService.updateUser(id, user);
	}
	
	@DeleteMapping(value = "/user/{id}")
	public User deleteUser(@PathVariable Long id) {
		return userService.deleteUser(id);
	}
}
