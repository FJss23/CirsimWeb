package com.tfg.cirsim.api.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.cirsim.api.entities.Connection;
import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Image;
import com.tfg.cirsim.api.entities.Point;
import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.TaskRepository;
import com.tfg.cirsim.api.services.TaskService;
import com.tfg.cirsim.api.services.UserService;
import com.tfg.cirsim.api.services.utility.ImageUtil;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
@Service
public class TaskServiceImpl implements TaskService {
	
	ImageUtil imageUtil = ImageUtil.getInstance();

	@Autowired
	TaskRepository taskRepository;
	
	@Autowired
	UserService userService;
	
	/**
	 * if the authenticated user has a student role, it returns the assigned 
	 * tasks, if the user has a teacher role, it returns the tares created
	 */
	@Override
	public Set<Task> getTasks() {
		User authenticated = userService.getAuthenticatedUser();
		Set<Task> taskToDo = new HashSet<Task>();
		if(authenticated.getRole() == Role.STUDENT) {
			taskToDo = authenticated.getTaskToDo();
		} 
		if(authenticated.getRole() == Role.TEACHER) {
			taskToDo = authenticated.getTaskAuthor();
		}
		imageUtil.setImagesInTask(taskToDo);
		return taskToDo;
	}

	@Override
	public Task getTask(Long id) {
		return taskRepository.findById(id).get();
	}

	@Override
	public Task updateTask(Long id, Task task) {
		return taskRepository.findById(id)
				.map(oldTask-> {
					oldTask.setId(id);
					oldTask.setAuthor(task.getAuthor());
					oldTask.setStudents(task.getStudents());
					oldTask.setTitle(task.getTitle());
					oldTask.setOpenDate(task.getOpenDate());
					oldTask.setExercises(task.getExercises());
					return taskRepository.save(oldTask);
				}).orElseGet(() -> {
					task.setId(id);
					return taskRepository.save(task);
				});
	}

	/**
	 * eliminates a task and additionally the images associated with 
	 * the exercises
	 */
	@Override
	@Transactional
	public void deleteTask(Long id) {
		Task taskToDelete = taskRepository.findById(id).get();
		taskToDelete.getExercises().forEach(exercise -> {
			imageUtil.deleteImage(exercise.getImage());
		});
		taskRepository.deleteById(id);
	}

	@Override
	public Task addTask(Task task) {
		User author = userService.getAuthenticatedUser();
		Set<User> students = userService.findByRole(Role.STUDENT);
		
		// father links 
		task.setAuthor(author);
		task.setStudents(students);
		
		// children links
		setChildExercise(task.getExercises(), task);
		author.getTaskAuthor().add(task);
		students.forEach(student -> student.getTaskToDo().add(task));
		
		// saving the father causes saving the children
		return taskRepository.save(task);
	}
	
	private void setChildExercise(Set<Exercise> exercises, Task task) {
		exercises.forEach(exercise -> {
			exercise.setTask(task);
			setChildPoint(exercise.getPoints(), exercise);
			setChildConnection(exercise.getConnections(),exercise);
			setChildImage(exercise.getImage(), exercise);
	});
	}

	private void setChildImage(Image image, Exercise exercise) {
		imageUtil.addImage(image, exercise);
	}

	private void setChildConnection(Set<Connection> connections, Exercise exercise) {
		connections.forEach(connection -> {
			connection.setExercise(exercise);
		});
	}

	private void setChildPoint(Set<Point> points, Exercise exercise) {
		points.forEach(point -> {
			point.setExercise(exercise);
		});
	}

	/**
	 * eliminates all tasks and additionally the images of each exercise
	 */
	@Override
	@Transactional
	public void deleteAll() {
		taskRepository.findAll().forEach(task -> {
			task.getExercises().forEach(exercise -> {
				imageUtil.deleteImage(exercise.getImage());
			});
		});
		taskRepository.deleteAll();
	}



}
