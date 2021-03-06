package com.tfg.cirsim.api.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;

/**
 * 
 * @author Francisco.Riedemann
 *
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);

	Set<User> findByRole(Role role);

	@Transactional
	@Modifying
	@Query("DELETE FROM TUSER u WHERE u.role <> 'ADMIN'")
	void deleteAllExceptAdmin();
}
