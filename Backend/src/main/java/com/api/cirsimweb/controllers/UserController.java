package com.api.cirsimweb.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.cirsimweb.entities.User;
import com.api.cirsimweb.services.UserService;

@RequestMapping("/api")
@RestController
public class UserController {
	
	@Autowired
	private UserService userService;

	@GetMapping("/user")
	private List<User> getAllUser() {
		return userService.getUsers();
	}
	
	@GetMapping("/user/{id}")
	private List<User> getUser() {
		return userService.getUsers();
	}
	
	@DeleteMapping("/user/{id}")
	private List<User> deleteUser() {
		return userService.getUsers();
	}
	
	@PostMapping("/user")
	private List<User> addUser() {
		return userService.getUsers();
	}
	
	@PutMapping("/user/{id}")
	private List<User> updateUser() {
		return userService.getUsers();
	}
}
