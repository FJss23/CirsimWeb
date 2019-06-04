package com.tfg.cirsim.api.controllers.dto;

import com.tfg.cirsim.api.entities.Status;

public class StatusUserOnly {
	
	private Long id;
	private Status status;
	
	public StatusUserOnly() { }

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
