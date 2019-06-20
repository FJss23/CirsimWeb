package com.tfg.cirsim.api.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 */
@Entity(name="TPOINT")
public class Point {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String positionX;
	
	private String positionY;
	
	private String label;
	
	private String color;
	
	private String shape;
	
	private int size;
	
	public Point() { }

	public Point(String positionX, String positionY, String label, 
			String color, String shape, int size) {
		this.positionX = positionX;
		this.positionY = positionY;
		this.label = label;
		this.color = color;
		this.shape = shape;
		this.size = size;
	}
	
	public Point(Long id, String positionX, String positionY, String label, 
			String color, String shape, int size) {
		super();
		this.id = id;
		this.positionX = positionX;
		this.positionY = positionY;
		this.label = label;
		this.color = color;
		this.shape = shape;
		this.size = size;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPositionX() {
		return positionX;
	}

	public void setPositionX(String positionX) {
		this.positionX = positionX;
	}

	public String getPositionY() {
		return positionY;
	}

	public void setPositionY(String positionY) {
		this.positionY = positionY;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	@Override
	public String toString() {
		return "Point [id=" + id + ", positionX=" + positionX + ", positionY=" + positionY + ", label=" + label
				+ ", color=" + color + ", shape=" + shape + ", size=" + size + "]";
	}
	
}
