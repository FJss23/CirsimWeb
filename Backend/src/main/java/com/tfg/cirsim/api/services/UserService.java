package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnlyDto;
import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
public interface UserService {
	
	User getUserByUsername(String username);

	Set<User> getUsers();

	User getUser(Long id);

	User updateUser(Long id, User user);

	User deleteUser(Long id);

	User addUser(User user);

	User partialUpdateStatus(StatusUserOnlyDto partialUpdate, Long id);

	Set<User> findByRole(Role role);
	
	User getAuthenticatedUser();

	Set<User> addUsers(Set<User> users);

	void deleteUsersAndTask();
}
