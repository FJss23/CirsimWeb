package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.entities.User;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
