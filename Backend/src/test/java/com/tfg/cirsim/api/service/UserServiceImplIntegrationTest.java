package com.tfg.cirsim.api.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;
import com.tfg.cirsim.api.services.UserService;
import com.tfg.cirsim.api.services.impl.UserServiceImpl;

@RunWith(SpringRunner.class)
public class UserServiceImplIntegrationTest {

	@TestConfiguration
    static class UserServiceImplTestContextConfiguration {
  
        @Bean
        public UserService userService() {
            return new UserServiceImpl();
        }
    }
	
    @Autowired
    private UserService userService;
 
    @MockBean
    private UserRepository userRepository;
    
    @Before
    public void setUp() {
    	User student = new User("UO101010","123","Pedro","Hernandez",Role.STUDENT);
        Mockito.when(userRepository.findByUsername(student.getUsername()))
          .thenReturn(student);
    }
    
    @Test
    public void whenValidUsername_thenUserShouldBeFound() {
        String username = "UO101010";
        User found = userService.getUserByUsername(username);
      
         assertThat(found.getUsername())
          .isEqualTo(username);
     }
    
    @Test
    public void whenInvalidUsername_thenUserShouldBeFound() {
        String username = "UO101010";
        User found = userService.getUserByUsername(username);
      
         assertThat(found.getUsername())
          .isEqualTo(null);
     }
}
