package com.tfg.cirsim.api.entities;

/**
 * 
 * @author francisco.riedemann
 * @date 03/06/2019
 *
 */
public enum Role {
	ADMIN("ROLE_ADMIN"), 
	TEACHER("ROLE_TEACHER"),  
	STUDENT("ROLE_STUDENT");
	
	private String text;
	
	Role(String text){
		this.text = text;
	}
	
	public String getText() {
		return text;
	}
}
