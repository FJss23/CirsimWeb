package com.tfg.cirsim.api.services;

import java.util.List;

import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.exception.ResourceNotFoundException;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
public interface UserService {

	List<User> getUsers();

	User getUser(Long id) throws ResourceNotFoundException;

	User updateUser(Long id, User user);

	User deleteUser(Long id) throws ResourceNotFoundException;

	User addUser(User user);

}
