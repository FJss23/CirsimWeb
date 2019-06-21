package com.tfg.cirsim.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.services.TaskService;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/api/cirsim", produces = { "application/json" })
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@GetMapping(value = "/task")
	public List<Task> getTasks() {
		//TODO
		return null;
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@PostMapping(value = "/task")
	public Task postTask(@RequestBody Task task) {
		return taskService.addTask(task);
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@GetMapping(value = "/task/{id}")
	public Task getTask(@PathVariable Long id) {
		//TODO
		return null;
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@PutMapping(value = "/task/{id}")
	public Task putTask(@PathVariable Long id, @RequestBody Task task) {
		//TODO
		return null;
	}
	
	@PreAuthorize("hasRole('ROLE_TEACHER')")
	@DeleteMapping(value = "/task/{id}")
	public Task deleteTask(@PathVariable Long id) {
		//TODO
		return null;
	}
}
