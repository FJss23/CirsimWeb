package com.tfg.cirsim.api.entities;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * 
 * @author francisco.riedemann
 * @date 04/09/2019
 *
 */
public enum Status {	
	ACTIVE("STATUS_ACTIVE"), 
	INACTIVE("STATUS_INACTIVE");
	
	private String text;
	
	Status() { }
	
	Status(String text){
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
	public static Status fromText(String text){
        for(Status r : Status.values()){
        	String alternative = r.getText().substring(7);
            if(r.getText().equals(text) || alternative.equals(text)){
                return r;
            }
        }
        throw new IllegalArgumentException();
    }
}
