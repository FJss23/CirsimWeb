package com.tfg.cirsim.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnlyDto;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.exception.ResourceNotFoundException;
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

	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@GetMapping(value = "/user")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/user")
	public User postUser(@RequestBody User user) {
		return userService.addUser(user);	
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(value= "/user/{id}")
	public User getUser(@PathVariable Long id) {
		try {
			return userService.getUser(id);
		}
		catch(ResourceNotFoundException exc) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, 
					"User " + id + " not found", exc);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping(value = "/user/{id}")
	public User putUser(@PathVariable Long id, @RequestBody User user) {
		return userService.updateUser(id, user);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(value = "/user/{id}")
	public User deleteUser(@PathVariable Long id) {
		try {
			return userService.deleteUser(id);
		} catch (ResourceNotFoundException exc) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, 
					"User " + id + " not found", exc);
		}
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PatchMapping(value = "/user/{id}")
	public User partialUpdateStatus(@RequestBody StatusUserOnlyDto partialUpdate,
			@PathVariable Long id) {
		try {
			return userService.partialUpdateStatus(partialUpdate, id);
		} catch (ResourceNotFoundException exc) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, 
					"User " + id + " not found", exc);
		}
	}
}
