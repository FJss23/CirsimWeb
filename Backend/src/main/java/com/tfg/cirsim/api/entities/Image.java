package com.tfg.cirsim.api.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
	
	private String imageb64;
	
	private String position;
	
	private String size;
	
	public Image() { }
	
	public Image(String imageb64, String position, String size) {
		this.imageb64 = imageb64;
		this.position = position;
		this.size = size;
	}

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

	@Override
	public String toString() {
		return "Image [id=" + id + ", imageb64=" + imageb64 + ", position=" + position + ", size=" + size + "]";
	}

}
