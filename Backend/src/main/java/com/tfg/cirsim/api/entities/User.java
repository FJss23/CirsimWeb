package com.tfg.cirsim.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
	
	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false, unique=true)
	private String username;
	
	private String name;
	
	private String surname;
	
	@Enumerated(EnumType.STRING)
	private Role role;	

	public User() { }
	
	public User(String username, String password, String name,
			String surname, Role role) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.role = role;
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

	@Override
	public String toString() {
		return "User [id=" + id + ", password=" + password + 
				", username=" + username + ", name=" + name + ", surname="
				+ surname + ", role=" + role + "]";
	}
	
}
