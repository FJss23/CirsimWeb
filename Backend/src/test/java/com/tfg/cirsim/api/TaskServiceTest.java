package com.tfg.cirsim.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.repository.TaskRepository;
import com.tfg.cirsim.api.services.TaskService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskServiceTest {

	@Autowired
	private TaskService taskService;
	
	@Autowired
	private TaskRepository taskRepository;
	
    @Before
    public void setUp() {
    	Task task = new Task(1L,"titulo",new Date(), new HashSet<Exercise>());
    	taskRepository.save(task);
    }
    
    @Test
    public void deleteAllTest() {
    	taskService.deleteAll();
    	 assertThat(taskService.getTasks().size())
         .isEqualTo(0);
    }
    
    @Test
    public void getTasksTest() {
    	 assertThat(taskService.getTasks().size())
         .isEqualTo(4);
    }
    
    @Test
    public void getOneTest() {
    	Task task = new Task(2L,"titulo2",new Date(), new HashSet<Exercise>());
    	task = taskRepository.save(task);
    	
    	 assertThat(taskService.getTask(task.getId()).getTitle())
         .isEqualTo(task.getTitle());
    }
    
    @Test
    public void DeleteOneTest() {
    	Task task = new Task(2L,"titulo2",new Date(), new HashSet<Exercise>());
    	task = taskRepository.save(task);
    	taskService.deleteTask(task.getId());
    	 assertThat(taskService.getTasks().size())
         .isEqualTo(1);
    }
    
}
