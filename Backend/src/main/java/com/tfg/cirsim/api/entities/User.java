package com.tfg.cirsim.api.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
@Entity(name="TUSER")
public class User {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	private String name;
	
	private String surname;
	
	@Enumerated(EnumType.STRING)
	private Role role;	
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@OneToMany(mappedBy = "author")
	private Set<Task> taskAuthor;
	
	@ManyToMany(mappedBy = "students")
	private Set<Task> taskToDo;

	public User() { }
	
	public User(String username, String password, String name,
			String surname, Role role) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = role;
		this.status = Status.ACTIVE;
	}
	
	public User(Long id, String username, String password, String name,
			String surname, Role role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = role;
		this.status = Status.ACTIVE;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Set<Task> getTaskAuthor() {
		return taskAuthor;
	}

	public void setTaskAuthor(Set<Task> taskAuthor) {
		this.taskAuthor = taskAuthor;
	}

	public Set<Task> getTaskToDo() {
		return taskToDo;
	}

	public void setTaskToDo(Set<Task> taskToDo) {
		this.taskToDo = taskToDo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((surname == null) ? 0 : surname.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (role != other.role)
			return false;
		if (status != other.status)
			return false;
		if (surname == null) {
			if (other.surname != null)
				return false;
		} else if (!surname.equals(other.surname))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	
}
