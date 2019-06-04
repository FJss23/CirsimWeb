package com.tfg.cirsim.api.controllers.dto;

import com.tfg.cirsim.api.entities.Status;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 * 
 */
public class StatusUserOnlyDto {
	
	private Long id;
	private Status status;
	
	public StatusUserOnlyDto() { }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
}
