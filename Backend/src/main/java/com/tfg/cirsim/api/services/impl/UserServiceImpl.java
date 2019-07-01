package com.tfg.cirsim.api.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnlyDto;
import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.Status;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;
import com.tfg.cirsim.api.services.UserService;

/**
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Override
	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public Set<User> getUsers() {
		Set<User> users = new HashSet<User>();
		userRepository.findAll().forEach(user -> {
			if(user.getRole() != Role.ADMIN) {
				users.add(user);
			}
		});
		return users;
	}

	@Override
	public User getUser(Long id) {
		return userRepository.findById(id).get();
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
					oldUser.setStatus(user.getStatus());
					return userRepository.save(oldUser);
				}).orElseGet(() -> {
					user.setId(id);
					return userRepository.save(user);
				});
	}

	@Override
	public User deleteUser(Long id){
		User user = userRepository.findById(id).get();
		userRepository.deleteById(id);
		return user;
	}

	@Override
	public User addUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		if(user.getStatus() == null) {
			user.setStatus(Status.ACTIVE);
		}
		return userRepository.save(user);
	}

	@Override
	public User partialUpdateStatus(StatusUserOnlyDto partialUpdate, Long id){
		User updatedUser = userRepository.findById(id).get();
		updatedUser.setStatus(partialUpdate.getStatus());

		return userRepository.save(updatedUser);
	}

	@Override
	public Set<User> findByRole(Role role) {
		return userRepository.findByRole(role);
	}

	@Override
	public User getAuthenticatedUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = (String)auth.getPrincipal();
		return getUserByUsername(username);
	}

	@Override
	public Set<User> addUsers(Set<User> users) {
		users.forEach(user -> {
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			if(user.getStatus() == null) {
				user.setStatus(Status.ACTIVE);
			}
		});	
		Set<User> usersSet = new HashSet<User>();
		userRepository.saveAll(users).forEach(usersSet::add);
		return usersSet;
	}

	@Override
	public void deleteUsers() {
		userRepository.deleteAllExceptAdmin();
	}
}
