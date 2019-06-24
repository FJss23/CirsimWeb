package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Task;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface TaskService {
	
	Set<Task> getTasks();
	
	Task getTask(Long id);
	
	Task updateTask(Long id, Task task);
	
	Task deleteTask(Long id);
	
	Task addTask(Task task);
	
}
