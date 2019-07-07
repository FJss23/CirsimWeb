package com.tfg.cirsim.api.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.cirsim.api.entities.Role;
import com.tfg.cirsim.api.entities.User;
import com.tfg.cirsim.api.repository.UserRepository;

/**
 * 
 * @author francisco riedemann
 * @data 30/06/2019
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryIntegrationTest {
 
    @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private UserRepository userRepository;
 
    @Test
    public void whenFindByUserName_thenReturnUser() {
        // given
        User student = new User("UO101010","123","Pedro","Hernandez",Role.STUDENT);
        entityManager.persist(student);
        entityManager.flush();
     
        // when
        User found = userRepository.findByUsername(student.getUsername());
     
        // then
        assertThat(found.getUsername())
          .isEqualTo(student.getUsername());
    }
    
    @Test
    public void whenFindByRole_thenReturnUser() {
        // given
        User admin = new User("UO101010","123","Pedro","Hernandez",Role.ADMIN);
        entityManager.persist(admin);
        User teacher = new User("UO999999","123","Esteban","Hernandez",Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
     
        // when
        Set<User> found = userRepository.findByRole(teacher.getRole());
     
        // then
        found.forEach(user -> {
        	assertThat(user.getUsername())
            .isEqualTo(teacher.getUsername());
        });
    }
    
    @Test
    public void whenDeleteAllExceptAdmin_thenReturnAdmin() {
        // given
        User admin = new User("UO101010","123","Pedro","Hernandez",Role.ADMIN);
        entityManager.persist(admin);
        User teacher = new User("UO999999","123","Esteban","Hernandez",Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
     
        // when
        userRepository.deleteAllExceptAdmin();
        
        Iterable<User> found = userRepository.findAll();
     
        // then
        found.forEach(user -> {
        	assertThat(user.getUsername())
            .isEqualTo(admin.getUsername());
        });
    }
 
}