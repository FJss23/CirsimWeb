package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.entities.Task;

/**
 * 
 * @author francisco riedemann
 */
@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

}
