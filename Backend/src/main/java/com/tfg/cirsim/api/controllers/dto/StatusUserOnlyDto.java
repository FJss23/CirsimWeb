package com.tfg.cirsim.api.controllers.dto;

import com.tfg.cirsim.api.entities.Status;

/**
 * 
 * @author francisco.riedemann
 * 
 */
public class StatusUserOnlyDto {
	
	private Status status;
	
	public StatusUserOnlyDto() { }

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
}
