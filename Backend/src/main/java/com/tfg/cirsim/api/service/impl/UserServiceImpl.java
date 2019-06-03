/**
 * 
 */
package com.tfg.cirsim.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.model.User;
import com.tfg.cirsim.api.repository.UserRepository;
import com.tfg.cirsim.api.service.UserService;

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
		return userRepository.findAll();
	}

	@Override
	public User getUser(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public User updateUser(Long id, User user) {
		User oldUser = this.getUser(id);
		//TODO: completar con la logica
		return userRepository.save(user);
	}

	@Override
	public User deleteUser(Long id) {
		User user = this.getUser(id);
		userRepository.deleteById(id);
		return user;
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}
}
