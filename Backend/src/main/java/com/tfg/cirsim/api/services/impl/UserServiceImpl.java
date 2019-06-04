package com.tfg.cirsim.api.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnly;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.exception.ResourceNotFoundException;
import com.tfg.cirsim.api.repository.UserRepository;
import com.tfg.cirsim.api.services.UserService;

/**
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Service(value = "userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public List<User> getUsers() {
		List<User> users = new ArrayList<User>();
		userRepository.findAll().forEach(users::add);
		return users;
	}

	@Override
	public User getUser(Long id) throws ResourceNotFoundException {
		return findUserWithException(id);
	}

	@Override
	public User updateUser(Long id, User user) {
		return userRepository.findById(id)
				.map(oldUser -> {
					oldUser.setId(id);
					oldUser.setName(user.getName());
					oldUser.setPassword(user.getPassword());
					oldUser.setRole(user.getRole());
					oldUser.setSurname(user.getSurname());
					oldUser.setUsername(user.getUsername());
					return userRepository.save(oldUser);
				}).orElseGet(() -> {
					user.setId(id);
					return userRepository.save(user);
				});
	}

	@Override
	public User deleteUser(Long id) throws ResourceNotFoundException{
		User user = findUserWithException(id);
		userRepository.deleteById(id);
		return user;
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}
	
	private User findUserWithException(Long id) throws ResourceNotFoundException {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException());
	}

	@Override
	public User partialUpdateStatus(StatusUserOnly partialUpdate, Long id) 
			throws ResourceNotFoundException {
		User updatedUser = findUserWithException(id);
		updatedUser.setStatus(partialUpdate.getStatus());
		return updatedUser;
	}
}
