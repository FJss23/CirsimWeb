package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.tfg.cirsim.api.entities.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

	Task findTopByOrderByIdDesc();
}
