package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
		User author = obtainAuthor();
		Set<User> students = obtainStudents();
		task.setAuthor(author);
		task.setStudents(students);
		exerciseService.addExercises(task.getExercises(), task);
		author.getTaskAuthor().add(task);
		students.forEach(student -> student.getTaskToDo().add(task));
		
		return taskRepository.save(task);
	}

	private Set<User> obtainStudents() {
		return userService.findByRole(Role.STUDENT);
	}

	private User obtainAuthor() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = (String)auth.getPrincipal();
		return userService.getUserByUsername(username);
	}

}
