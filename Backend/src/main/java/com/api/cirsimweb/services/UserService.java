package com.api.cirsimweb.services;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.api.cirsimweb.entities.User;

@Service
public class UserService {
	
	private List<User> users = new LinkedList<User>();

	@PostConstruct
	public void init() {
		users.add(new User(1L, "juan", "1234"));
	}
	
	public List<User> getUsers(){
		return users;
	}
}
