package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnlyDto;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.exception.ResourceNotFoundException;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
public interface UserService {

	Set<User> getUsers();

	User getUser(Long id) throws ResourceNotFoundException;

	User updateUser(Long id, User user);

	User deleteUser(Long id) throws ResourceNotFoundException;

	User addUser(User user);

	User partialUpdateStatus(StatusUserOnlyDto partialUpdate, Long id) 
			throws ResourceNotFoundException;

}
