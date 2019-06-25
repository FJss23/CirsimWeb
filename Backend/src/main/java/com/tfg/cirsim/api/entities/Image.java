package com.tfg.cirsim.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */

@Entity(name="TIMAGE")
public class Image {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column
	private String imageb64;
	
	private String position;
	
	private String size;
	
	@OneToOne
	@JoinColumn(name = "exercise_id", referencedColumnName = "id")
	@JsonIgnore
	private Exercise exercise;
	
	public Image() { }

	public Image(Long id, String imageb64, String position, String size) {
		super();
		this.id = id;
		this.imageb64 = imageb64;
		this.position = position;
		this.size = size;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImageb64() {
		return imageb64;
	}

	public void setImageb64(String imageb64) {
		this.imageb64 = imageb64;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
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
		result = prime * result + ((imageb64 == null) ? 0 : imageb64.hashCode());
		result = prime * result + ((position == null) ? 0 : position.hashCode());
		result = prime * result + ((size == null) ? 0 : size.hashCode());
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
		Image other = (Image) obj;
		if (imageb64 == null) {
			if (other.imageb64 != null)
				return false;
		} else if (!imageb64.equals(other.imageb64))
			return false;
		if (position == null) {
			if (other.position != null)
				return false;
		} else if (!position.equals(other.position))
			return false;
		if (size == null) {
			if (other.size != null)
				return false;
		} else if (!size.equals(other.size))
			return false;
		return true;
	}


	
}
