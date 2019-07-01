package com.tfg.cirsim.api.entities;

import com.fasterxml.jackson.annotation.JsonCreator;

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
	
	@Override 
	public String toString() { 
		return text; 
	}
	
	@JsonCreator
	public static Role fromText(String text){
        for(Role r : Role.values()){
            if(r.getText().equals(text)){
                return r;
            }
        }
        throw new IllegalArgumentException();
    }
	
}
