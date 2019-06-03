package com.tfg.cirsim.api.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;

import org.springframework.data.annotation.Id;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */
public class User {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable=false)
	private String password;
	
	@Column(nullable=false)
	private String username;

	public User() { }
	
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public String getUsername() {
		return username;
	}
}
