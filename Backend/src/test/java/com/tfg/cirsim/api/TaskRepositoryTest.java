package com.tfg.cirsim.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Task;
import com.tfg.cirsim.api.repository.TaskRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TaskRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private TaskRepository taskRepository;
    
	@Test
    public void obtainAllTasksTest() {
        Task task = new Task();
        entityManager.persist(task);
        entityManager.flush();
        
        Set<Task> founded = new HashSet<Task>();
        taskRepository.findAll().forEach(founded::add);
     
        assertThat(founded.size())
          .isEqualTo(1);
    }
    
    @Test
    public void deleteAllTasksTest() {
    	Task task = new Task();
        entityManager.persist(task);
        Task secondTask = new Task();
        entityManager.persist(secondTask);
        entityManager.flush();
        
        taskRepository.deleteAll();
        List<Task> contList = new ArrayList<Task>();
        taskRepository.findAll().forEach(contList::add);
        
        assertThat(contList.size())
        .isEqualTo(0);
    }
    
    @Test
    public void findTaskWithExercisesTest() {
    	String taskTitle = "Título test";
    	Set<Exercise> exercises = new HashSet<Exercise>();
    	Exercise ex = new Exercise();
    	exercises.add(ex);
    	
    	Task task = new Task();
    	task.setTitle(taskTitle);
        task.setExercises(exercises);
        exercises.forEach(exer -> exer.setTask(task));
        entityManager.persist(ex);
        entityManager.persist(task);
        entityManager.flush();

        Iterable<Task> founded = taskRepository.findAll();
    
        
        assertThat(Lists.newArrayList(founded).size())
        .isEqualTo(1);
    }
}
