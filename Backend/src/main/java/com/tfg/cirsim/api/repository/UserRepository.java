package com.tfg.cirsim.api.repository;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);

	Set<User> findByRole(Role role);
	
	User findTopByOrderByIdDesc();
}
