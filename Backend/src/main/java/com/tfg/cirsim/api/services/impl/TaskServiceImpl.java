package com.tfg.cirsim.api.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.TaskRepository;
import com.tfg.cirsim.api.services.ExerciseService;
import com.tfg.cirsim.api.services.TaskService;
import com.tfg.cirsim.api.services.UserService;

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
	
	@Autowired
	UserService userService;
	
	@Autowired
	ExerciseService exerciseService;
	
	@Override
	public Set<Task> getTasks() {
		User authenticated = userService.getAuthenticatedUser();
		if(authenticated.getRole() == Role.STUDENT) {
			return authenticated.getTaskToDo();
		} 
		if(authenticated.getRole() == Role.TEACHER) {
			return authenticated.getTaskAuthor();
		}
		return new HashSet<Task>();
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
		User author = userService.getAuthenticatedUser();
		Set<User> students = userService.findByRole(Role.STUDENT);
		
		// father links 
		task.setAuthor(author);
		task.setStudents(students);
		
		// children links
		exerciseService.addExercises(task.getExercises(), task);
		author.getTaskAuthor().add(task);
		students.forEach(student -> student.getTaskToDo().add(task));
		
		// saving the father causes saving the children
		return taskRepository.save(task);
	}



}
