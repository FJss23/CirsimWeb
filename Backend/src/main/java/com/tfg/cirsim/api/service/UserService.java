package com.tfg.cirsim.api.service;

import java.util.List;

import com.tfg.cirsim.api.model.User;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
public interface UserService {

	List<User> getUsers();

	User getUser(Long id);

	User updateUser(Long id, User user);

	User deleteUser(Long id);

	User addUser(User user);

}
