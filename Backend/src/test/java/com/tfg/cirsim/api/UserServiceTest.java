package com.tfg.cirsim.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.cirsim.api.controllers.dto.StatusUserOnlyDto;
import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.Status;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.services.UserService;

/**
 * 
 * @author francisco riedemann
 * @data 30/06/2019
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
  
    @Autowired
    private UserService userService;
    
    @Before
    public void setUp() {
    	User alumno5 = new User("user5","123","Esteban5","Hernandez5", Role.STUDENT);
    	userService.addUser(alumno5);
    	User alumno6 = new User("user6","123","Esteba6","Hernandez6", Role.STUDENT);
    	userService.addUser(alumno6);
    	User alumno7 = new User("user7","123","Esteba7","Hernandez7", Role.TEACHER);
    	userService.addUser(alumno7);
    }
    
    @Test
    public void getUsersTest() {
    	// En el sistema ya existen 5 usuarios no administradores
		 assertThat(userService.getUsers().size())
         .isEqualTo(8);
    }
    
    @Test
    public void getUserTest() {
		 assertThat(userService.getUserByUsername("user5").getUsername())
         .isEqualTo("user5");
    }
    
    @Test
    public void updateUserTest() {
    	String username = "alumno1";
    	User alumno1 = userService.getUserByUsername(username);
    	String newName = "alumno1_new";
    	alumno1.setName(newName);
    	userService.updateUser(alumno1.getId(), alumno1);
    	
    	alumno1 = userService.getUserByUsername(username);
		 assertThat(alumno1.getName())
         .isEqualTo(newName);
    }
    
    @Test
    public void addUserTest() {
    	User alumno8 = new User("user8","123","Esteba8","Hernandez8", Role.ADMIN);
    	userService.addUser(alumno8);
		 assertThat(userService.getUserByUsername("user8"))
         .isEqualTo(alumno8);
		 
    }
    
    @Test
    public void partialUpdateStatusTest() {
    	StatusUserOnlyDto dto = new StatusUserOnlyDto();
    	dto.setStatus(Status.INACTIVE);
    	String username = "user5";
    	User alumno5 = userService.getUserByUsername(username);
    	
    	userService.partialUpdateStatus(dto, alumno5.getId());
		 assertThat(userService.getUserByUsername(username).getStatus())
         .isEqualTo(Status.INACTIVE);
    }
    
    @Test
    public void addUsersTest() {
    	User alumno9 = new User("user9","123","Esteba9","Hernandez9", Role.ADMIN);
    	Set<User> users = new HashSet<User>();
    	users.add(alumno9);
    	userService.addUsers(users);
    	
		 assertThat(userService.getUserByUsername("user9"))
         .isEqualTo(alumno9);
		 
    }
}