package com.tfg.cirsim.api.entities;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * 
 * @author francisco.riedemann
 *
 */
public enum Role {
	ADMIN("ROLE_ADMIN"), 
	TEACHER("ROLE_TEACHER"),  
	STUDENT("ROLE_STUDENT");
	
	private String text;
	
	Role() { }
	
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
        	String alternative = r.getText().substring(5);
            if(r.getText().equals(text) || alternative.equals(text)){
                return r;
            }
        }
        throw new IllegalArgumentException();
    }
	
}
