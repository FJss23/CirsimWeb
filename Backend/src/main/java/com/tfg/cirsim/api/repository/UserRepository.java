package com.tfg.cirsim.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.model.User;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	
	List<User> findAll();
	Optional<User> findById(Long id);
}
