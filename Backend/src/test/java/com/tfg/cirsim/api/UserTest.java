package com.tfg.cirsim.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
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
public class UserTest {
 
    @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private UserRepository userRepository;
    
    @Test
    public void whenFindByRole_thenReturnUser() {
        User teacher = new User("user3","123","Esteban","Hernandez", Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
        Set<User> found = userRepository.findByRole(Role.TEACHER);
     
        assertThat(found.size())
          .isEqualTo(1);
        
        found.forEach(user -> {
            assertThat(user.getRole())
            .isEqualTo(Role.TEACHER);
        });

    }
    
    @Test
    public void whenFindAllUsers_thenReturnAll() {
        User student = new User("user2","123","Juan","Juanito", Role.STUDENT);
        entityManager.persist(student);
        entityManager.flush();
        
        Iterable<User> found = userRepository.findAll();
        List<User> contList = new ArrayList<User>();
        found.forEach(contList::add);
        
        assertThat(contList.size())
        .isEqualTo(1);
    }
    
    @Test
    public void whenDeleteAllExceptAdmin_thenReturnAdmin() {
        User admin = new User("user1","123","Pedro","Hernandez", Role.ADMIN);
        entityManager.persist(admin);
        User teacher = new User("user3","123","Esteban","Hernandez", Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
        
        userRepository.deleteAllExceptAdmin();
        Iterable<User> found = userRepository.findAll();
     
        found.forEach(user -> {
        	assertThat(user.getUsername())
            .isEqualTo(admin.getUsername());
        });
    }
    
    @Test
    public void whenDeleteOneUser_thenDesNotExists() {
    	User admin = new User("user1","123","Pedro","Hernandez", Role.ADMIN);
        entityManager.persist(admin);
        entityManager.flush();
        
        User founded = userRepository.findByUsername(admin.getUsername());
        userRepository.deleteById(founded.getId());
        
        founded = userRepository.findByUsername(admin.getUsername());
        assertThat(founded)
        .isEqualTo(null);
    }

    @Test
    public void whenFindByRole_thenNoUserToReturn() {
        User teacher = new User("user3","123","Esteban","Hernandez", Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
        Set<User> found = userRepository.findByRole(Role.ADMIN);
     
        assertThat(found.size())
          .isEqualTo(0);
    }
    
    @Test
    public void whenFindAllUsers_thenNoUsersToReturn() {
        Iterable<User> found = userRepository.findAll();
        List<User> contList = new ArrayList<User>();
        found.forEach(contList::add);
        
        assertThat(contList.size())
        .isEqualTo(0);
    }
    
    @Test
    public void whenDeleteAllExceptAdmin_thenNoUsersToReturn() {
        User teacher = new User("user1","123","Pedro","Hernandez", Role.TEACHER);
        entityManager.persist(teacher);
        entityManager.flush();
        
        userRepository.deleteAllExceptAdmin();
        Iterable<User> found = userRepository.findAll();
        List<User> contList = new ArrayList<User>();
        found.forEach(contList::add);
        
        assertThat(contList.size())
        .isEqualTo(0);
    }
}