package com.tfg.cirsim.api.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.repository.TaskRepository;
import com.tfg.cirsim.api.services.TaskService;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskRepository;
	
	@Override
	public List<Task> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Task getTask(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Task updateTask(Long id, Task task) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Task deleteTask(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Task addTask(Task task) {
		return taskRepository.save(task);
	}

}
