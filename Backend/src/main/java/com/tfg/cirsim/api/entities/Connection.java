package com.tfg.cirsim.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
@Entity(name="TCONNECTION")
public class Connection {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "vis_id")
	private String visId;
	
	private String fromVisId;
	
	private String toVisId;
	
	private int width;
	
	@ManyToOne
	@JsonIgnore
	private Exercise exercise;
	
	public Connection() { }

	public Connection(Long id, String visId, String fromVisId, String toVisId, int width) {
		super();
		this.id = id;
		this.visId = visId;
		this.fromVisId = fromVisId;
		this.toVisId = toVisId;
		this.width = width;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVisId() {
		return visId;
	}

	public void setVisId(String visId) {
		this.visId = visId;
	}

	public String getFromVisId() {
		return fromVisId;
	}

	public void setFromVisId(String fromVisId) {
		this.fromVisId = fromVisId;
	}

	public String getToVisId() {
		return toVisId;
	}

	public void setToVisId(String toVisId) {
		this.toVisId = toVisId;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fromVisId == null) ? 0 : fromVisId.hashCode());
		result = prime * result + ((toVisId == null) ? 0 : toVisId.hashCode());
		result = prime * result + ((visId == null) ? 0 : visId.hashCode());
		result = prime * result + width;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Connection other = (Connection) obj;
		if (fromVisId == null) {
			if (other.fromVisId != null)
				return false;
		} else if (!fromVisId.equals(other.fromVisId))
			return false;
		if (toVisId == null) {
			if (other.toVisId != null)
				return false;
		} else if (!toVisId.equals(other.toVisId))
			return false;
		if (visId == null) {
			if (other.visId != null)
				return false;
		} else if (!visId.equals(other.visId))
			return false;
		if (width != other.width)
			return false;
		return true;
	}

}
