package com.tfg.cirsim.api.entities;

import javax.persistence.*;

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

	public User() { }
	
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public User(Long id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", password=" + password + ", username=" + username + "]";
	}
}
