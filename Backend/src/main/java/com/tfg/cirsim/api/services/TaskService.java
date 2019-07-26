package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Task;

/**
 * 
 * @author francisco riedemann
 *
 */
public interface TaskService {
	
	/**

	 * if the authenticated user has a student role, it returns the assigned 
	 * tasks, if the user has a teacher role, it returns the tares created

	 * @return the tasks associated with the role
	 */
	Set<Task> getTasksWithRole();
	
	Task getTask(Long id);
	
	Task updateTask(Long id, Task task);
	
	/**

	 * eliminates a task and additionally the images associated with 
	 * the exercises

	 * @param id task to delete
	 */
	void deleteTask(Long id);
	
	Task addTask(Task task);

	/**
	 * eliminates all tasks and additionally the images of each exercise
	 */
	void deleteAll();
	
	Set<Task> getTasks();
	
}
